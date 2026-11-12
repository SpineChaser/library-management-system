import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const genre = await this.prisma.genre.findUnique({
      where: { id: createBookDto.genreId },
    });

    if (!genre) {
      throw new NotFoundException(
        `Genre with ID ${createBookDto.genreId} was not found`,
      );
    }

    const totalCopies = createBookDto.totalCopies ?? 1;
    const availableCopies =
      createBookDto.availableCopies ?? totalCopies;

    if (availableCopies > totalCopies) {
      throw new BadRequestException(
        'Available copies cannot exceed total copies',
      );
    }

    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        author: createBookDto.author,
        isbn: createBookDto.isbn,
        publicationYear: createBookDto.publicationYear,
        totalCopies,
        availableCopies,
        genreId: createBookDto.genreId,
      },
      include: {
        genre: true,
      },
    });
  }

  async findAll() {
    return this.prisma.book.findMany({
      include: {
        genre: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async findOne(id: number) {
  const book = await this.prisma.book.findUnique({
    where: { id },
    include: {
      genre: true,
    },
  });

  if (!book) {
    throw new NotFoundException(`Book with ID ${id} was not found`);
  }

  return book;
 }
 async update(id: number, updateBookDto: UpdateBookDto) {
  const existingBook = await this.prisma.book.findUnique({
    where: { id },
  });

  if (!existingBook) {
    throw new NotFoundException(`Book with ID ${id} was not found`);
  }

  if (updateBookDto.genreId !== undefined) {
    const genre = await this.prisma.genre.findUnique({
      where: { id: updateBookDto.genreId },
    });

    if (!genre) {
      throw new NotFoundException(
        `Genre with ID ${updateBookDto.genreId} was not found`,
      );
    }
  }

  const totalCopies =
    updateBookDto.totalCopies ?? existingBook.totalCopies;

  const availableCopies =
    updateBookDto.availableCopies ?? existingBook.availableCopies;

  if (availableCopies > totalCopies) {
    throw new BadRequestException(
      'Available copies cannot exceed total copies',
    );
  }

  return this.prisma.book.update({
    where: { id },
    data: {
      ...updateBookDto,
      totalCopies,
      availableCopies,
    },
    include: {
      genre: true,
    },
  });
 } 
 async remove(id: number) {
  const existingBook = await this.prisma.book.findUnique({
    where: { id },
  });

  if (!existingBook) {
    throw new NotFoundException(`Book with ID ${id} was not found`);
  }

  const setBookCount = await this.prisma.setBook.count({
    where: { bookId: id },
  });

  if (setBookCount > 0) {
    throw new ConflictException(
      'This book cannot be deleted because it is linked to curriculum records',
    );
  }

  return this.prisma.book.delete({
    where: { id },
  });
 }
}
