import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsISBN,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  author: string;

  @IsOptional()
  @IsISBN()
  isbn?: string;

  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(2100)
  publicationYear?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalCopies?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  availableCopies?: number;

  @IsInt()
  @Min(1)
  genreId: number;
}