
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not configured');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  // 1. Create or update the book genres.
  const genres = [
    {
      name: 'Fiction',
      description: 'Imaginary stories and creative literature.',
    },
    {
      name: 'Science',
      description: 'Books about scientific discoveries and principles.',
    },
    {
      name: 'History',
      description: 'Books about historical events and civilizations.',
    },
    {
      name: 'Technology',
      description: 'Books about computing and modern technology.',
    },
    {
      name: 'Literature',
      description: 'Prescribed Kenyan secondary-school literature and set books.',
  },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  console.log('Genres created or updated.');

  // 2. Define sample books.
  const books = [
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780385474542',
      publicationYear: 1958,
      genre: 'Fiction',
    },
    {
      title: 'The River Between',
      author: "Ngugi wa Thiong'o",
      isbn: '9780435905484',
      publicationYear: 1965,
      genre: 'Fiction',
    },
    {
      title: 'Purple Hibiscus',
      author: 'Chimamanda Ngozi Adichie',
      isbn: '9781616202415',
      publicationYear: 2003,
      genre: 'Fiction',
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      publicationYear: 1925,
      genre: 'Fiction',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      publicationYear: 1988,
      genre: 'Science',
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      isbn: '9780198788607',
      publicationYear: 1976,
      genre: 'Science',
    },
    {
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '9780345539434',
      publicationYear: 1980,
      genre: 'Science',
    },
    {
      title: 'The Origin of Species',
      author: 'Charles Darwin',
      isbn: '9781509827695',
      publicationYear: 1859,
      genre: 'Science',
    },
    {
      title: 'Kenya: A History Since Independence',
      author: 'Charles Hornsby',
      isbn: '9781848858862',
      publicationYear: 2012,
      genre: 'History',
    },
    {
      title: 'Long Walk to Freedom',
      author: 'Nelson Mandela',
      isbn: '9780316548182',
      publicationYear: 1994,
      genre: 'History',
    },
    {
      title: 'The Art of War',
      author: 'Sun Tzu',
      isbn: '9781590302255',
      publicationYear: null,
      genre: 'History',
    },
    {
      title: 'Guns, Germs, and Steel',
      author: 'Jared Diamond',
      isbn: '9780393354324',
      publicationYear: 1997,
      genre: 'History',
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      publicationYear: 2008,
      genre: 'Technology',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      isbn: '9780135957059',
      publicationYear: 1999,
      genre: 'Technology',
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '9780262046305',
      publicationYear: 2022,
      genre: 'Technology',
    },
    {
      title: 'Design Patterns',
      author: 'Erich Gamma',
      isbn: '9780201633610',
      publicationYear: 1994,
      genre: 'Technology',
    },
   ];
  // 3. Verified Kenyan secondary-school set books.
  const setBooks = [
    // 8-4-4: 2013–2017
    {
      title: 'The River and the Source',
      author: 'Margaret A. Ogola',
      subject: 'ENGLISH',
      category: 'NOVEL',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Focus',
      isCompulsory: null,
      prescribedFromYear: 2013,
      prescribedToYear: 2017,
    },
    {
      title: 'The Caucasian Chalk Circle',
      author: 'Bertolt Brecht',
      subject: 'ENGLISH',
      category: 'PLAY',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Penguin (Spotlight Publishers EA Ltd)',
      isCompulsory: null,
      prescribedFromYear: 2013,
      prescribedToYear: 2017,
    },
    {
      title: 'Betrayal in the City',
      author: 'Francis Imbuga',
      subject: 'ENGLISH',
      category: 'PLAY',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'East Africa Educational Publishers',
      isCompulsory: null,
      prescribedFromYear: 2013,
      prescribedToYear: 2017,
    },
    {
      title: 'Kidagaa Kimemwozea',
      author: 'Ken Walibora',
      subject: 'KISWAHILI',
      category: 'NOVEL',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Spotlight Publishers EA Ltd',
      isCompulsory: null,
      prescribedFromYear: 2013,
      prescribedToYear: 2017,
    },

    // 8-4-4: 2017–2021
    {
      title: 'The Pearl',
      author: 'John Steinbeck',
      subject: 'ENGLISH',
      category: 'NOVEL',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Pearson Education',
      isCompulsory: false,
      prescribedFromYear: 2017,
      prescribedToYear: 2021,
    },
    {
      title: 'Memories We Lost and Other Stories',
      author: 'Chris Wanjala',
      subject: 'ENGLISH',
      category: 'SHORT_STORIES',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Moran EA Publishers',
      isCompulsory: false,
      prescribedFromYear: 2017,
      prescribedToYear: 2021,
    },
    {
      title: 'Kigogo',
      author: 'Pauline Kea',
      subject: 'KISWAHILI',
      category: 'PLAY',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Storymoja',
      isCompulsory: null,
      prescribedFromYear: 2017,
      prescribedToYear: 2021,
    },
    {
      title: 'Tumbo Lisiloshiba na Hadithi Nyingine',
      author: 'Alifa Chokocho and Dumu Kayanda',
      subject: 'KISWAHILI',
      category: 'SHORT_STORIES',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Longhorn Kenya Ltd',
      isCompulsory: null,
      prescribedFromYear: 2017,
      prescribedToYear: 2021,
    },

    // 8-4-4: 2022–2026
    {
      title: 'Fathers of Nations',
      author: 'Paul B. Vitta',
      subject: 'ENGLISH',
      category: 'NOVEL',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Oxford University Press',
      isCompulsory: true,
      prescribedFromYear: 2023,
      prescribedToYear: 2026,
    },
    {
      title: 'The Samaritan',
      author: 'John Lara',
      subject: 'ENGLISH',
      category: 'PLAY',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Kenya Literature Bureau',
      isCompulsory: true,
      prescribedFromYear: 2023,
      prescribedToYear: 2026,
    },
    {
      title: 'Artist of the Floating World',
      author: 'Kazuo Ishiguro',
      subject: 'ENGLISH',
      category: 'NOVEL',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Longhorn Publishers',
      isCompulsory: false,
      prescribedFromYear: 2022,
      prescribedToYear: 2026,
    },
    {
      title: 'A Silent Song and Other Stories',
      author: 'Edited by Godwin Siundu',
      subject: 'ENGLISH',
      category: 'SHORT_STORIES',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Spotlight Publishers (EA) Limited',
      isCompulsory: false,
      prescribedFromYear: 2022,
      prescribedToYear: 2026,
    },
    {
      title: 'A Parliament of Owls',
      author: 'Adipo Sidang',
      subject: 'ENGLISH',
      category: 'PLAY',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'East African Educational Publishers',
      isCompulsory: false,
      prescribedFromYear: 2023,
      prescribedToYear: 2026,
    },
    {
      title: 'Bembea',
      author: 'Dr. Timothy Moriasi',
      subject: 'KISWAHILI',
      category: 'PLAY',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Access Publishers',
      isCompulsory: true,
      prescribedFromYear: 2022,
      prescribedToYear: 2026,
    },
    {
      title: 'Mapambazuko ya Machweo na Hadithi Nyingine',
      author: 'Various authors',
      subject: 'KISWAHILI',
      category: 'SHORT_STORIES',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Mountaintop Publishers',
      isCompulsory: null,
      prescribedFromYear: 2022,
      prescribedToYear: 2026,
    },
    {
      title: 'Nguu za Jadi',
      author: 'Prof. Clara Momanyi',
      subject: 'KISWAHILI',
      category: 'NOVEL',
      curriculum: 'KCSE_8_4_4',
      classLevel: 'Form 3-4',
      publisher: 'Queenex Publishers',
      isCompulsory: true,
      prescribedFromYear: 2023,
      prescribedToYear: 2026,
    },

    // CBC Senior School: 2026–2030
    {
      title: 'Dreams Denied',
      author: 'James Karuga',
      subject: 'ENGLISH',
      category: 'PLAY',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: 'Storymoja',
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
    {
      title: 'Dear Mama',
      author: 'Kinyanjui Kombani',
      subject: 'ENGLISH',
      category: 'OTHER',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: 'Oxford University Press',
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
    {
      title: 'The Gold Coin and Other Stories',
      author: 'Henry Indangasi, Charles Gecaga, Anna Kula, Muchiri Mukunga and Larry Ndivo',
      subject: 'ENGLISH',
      category: 'SHORT_STORIES',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: 'Kenya Literature Bureau',
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
    {
      title: 'The Parting Clouds',
      author: 'Ken Kamoche',
      subject: 'ENGLISH',
      category: 'NOVEL',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: 'East African Educational Publishers',
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
    {
      title: 'Mlemavu? Sio Mimi',
      author: 'Godfrey Ipalei',
      subject: 'KISWAHILI',
      category: 'OTHER',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: 'Oxford University Press',
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
    {
      title: 'Fumbo la Baba',
      author: 'Kenna Wasike',
      subject: 'KISWAHILI',
      category: 'NOVEL',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: 'Hummingbird Mussik',
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
    {
      title: 'Jahazi la Mchongoma',
      author: 'George Okach',
      subject: 'KISWAHILI',
      category: 'PLAY',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: null,
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
    {
      title: 'Kichaa cha Mlungula na Hadithi Nyingine',
      author: 'Various authors',
      subject: 'KISWAHILI',
      category: 'SHORT_STORIES',
      curriculum: 'CBC',
      classLevel: 'Grades 10-12',
      publisher: null,
      isCompulsory: null,
      prescribedFromYear: 2026,
      prescribedToYear: 2030,
    },
  ] as const;

  // 3. Insert books and connect each one to its genre.
  for (const book of books) {
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { name: book.genre },
    });

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        publicationYear: book.publicationYear,
        genreId: genre.id,
      },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publicationYear: book.publicationYear,
        totalCopies: 5,
        availableCopies: 5,
        genreId: genre.id,
      },
    });
  }
  
  // 4. Save set books and their curriculum details.
  const literatureGenre = await prisma.genre.findUniqueOrThrow({
    where: { name: 'Literature' },
  });

  for (const setBook of setBooks) {
    // Find the book by title and author.
    let book = await prisma.book.findFirst({
      where: {
        title: setBook.title,
        author: setBook.author,
      },
    });

    // Create it if it does not already exist.
    if (!book) {
      book = await prisma.book.create({
        data: {
          title: setBook.title,
          author: setBook.author,
          isbn: null,
          publicationYear: null,
          totalCopies: 5,
          availableCopies: 5,
          genreId: literatureGenre.id,
        },
      });
    } else {
      // Ensure an existing book belongs to Literature.
      book = await prisma.book.update({
        where: { id: book.id },
        data: {
          genreId: literatureGenre.id,
        },
      });
    }

    // Find an existing set-book record to prevent duplicates.
    const existingSetBook = await prisma.setBook.findFirst({
      where: {
        bookId: book.id,
        subject: setBook.subject,
        curriculum: setBook.curriculum,
        prescribedFromYear: setBook.prescribedFromYear,
      },
    });

    const setBookData = {
      subject: setBook.subject,
      category: setBook.category,
      curriculum: setBook.curriculum,
      classLevel: setBook.classLevel,
      publisher: setBook.publisher,
      isCompulsory: setBook.isCompulsory,
      prescribedFromYear: setBook.prescribedFromYear,
      prescribedToYear: setBook.prescribedToYear,
    };

    if (existingSetBook) {
      await prisma.setBook.update({
        where: { id: existingSetBook.id },
        data: setBookData,
      });
    } else {
      await prisma.setBook.create({
        data: {
          ...setBookData,
          bookId: book.id,
        },
      });
    }
  }

  console.log(`${setBooks.length} set-book records created or updated.`);
  console.log('16 books created or updated.');
  console.log('Database seeding completed successfully.');
}

main()
  .catch((error) => {
    console.error('Database seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
