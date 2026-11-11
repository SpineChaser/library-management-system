\# Library Management System – System Architecture



\## 1. Introduction



The Library Management System is a backend application built with NestJS, Prisma ORM and PostgreSQL.



The system provides a relational data layer for managing library users, book records, genres and Kenyan secondary-school set books.



The database is hosted on Supabase PostgreSQL. Prisma handles database access, schema management, migrations and data seeding.



This document describes the current implemented architecture and identifies areas planned for future development.



\## 2. System Architecture Overview



The application follows a layered architecture.



\### Architecture Diagram



```mermaid

flowchart TD

&#x20;   A\[Client / API Consumer] --> B\[NestJS Application]

&#x20;   B --> C\[Application Modules]

&#x20;   C --> D\[Prisma Service]

&#x20;   D --> E\[Prisma ORM]

&#x20;   E --> F\[PostgreSQL Driver Adapter]

&#x20;   F --> G\[(Supabase PostgreSQL Database)]



&#x20;   H\[Prisma Schema] --> E

&#x20;   I\[Prisma Migrations] --> G

&#x20;   J\[Seed Script] --> E



&#x20;   style A fill:#e8f0fe,stroke:#3367d6

&#x20;   style B fill:#e8f5e9,stroke:#388e3c

&#x20;   style G fill:#fff3e0,stroke:#ef6c00

```



\### Architecture Components



| Component | Responsibility |

|---|---|

| Client / API Consumer | Sends requests to the backend application. |

| NestJS Application | Provides the backend application structure. |

| Application Modules | Organise application services and functionality. |

| Prisma Service | Manages the Prisma Client connection and lifecycle. |

| Prisma ORM | Provides database queries and relational data access. |

| PostgreSQL Driver Adapter | Connects Prisma to PostgreSQL using the `pg` driver. |

| Supabase PostgreSQL | Stores the application's persistent data. |

| Prisma Schema | Defines database models, fields, enums and relationships. |

| Prisma Migrations | Records and applies database structure changes. |

| Seed Script | Creates or updates sample catalogue and set-book data. |



\## 3. Database Architecture



The database uses a relational structure.



The main models are:



\- User

\- Genre

\- Book

\- SetBook



The Role, SetBookSubject, SetBookCategory and Curriculum enums define controlled values for specific fields.



\### 3.1 Entity Relationship Diagram (ERD)



```mermaid

erDiagram

&#x20;   User {

&#x20;       int id PK

&#x20;       string name

&#x20;       string email UK

&#x20;       string password

&#x20;       Role role

&#x20;       datetime createdAt

&#x20;       datetime updatedAt

&#x20;   }



&#x20;   Genre {

&#x20;       int id PK

&#x20;       string name UK

&#x20;       string description

&#x20;       datetime createdAt

&#x20;       datetime updatedAt

&#x20;   }



&#x20;   Book {

&#x20;       int id PK

&#x20;       string title

&#x20;       string author

&#x20;       string isbn UK

&#x20;       int publicationYear

&#x20;       int totalCopies

&#x20;       int availableCopies

&#x20;       int genreId FK

&#x20;       datetime createdAt

&#x20;       datetime updatedAt

&#x20;   }



&#x20;   SetBook {

&#x20;       int id PK

&#x20;       int bookId FK

&#x20;       SetBookSubject subject

&#x20;       SetBookCategory category

&#x20;       Curriculum curriculum

&#x20;       string classLevel

&#x20;       string publisher

&#x20;       boolean isCompulsory

&#x20;       int prescribedFromYear

&#x20;       int prescribedToYear

&#x20;       string notes

&#x20;       datetime createdAt

&#x20;       datetime updatedAt

&#x20;   }



&#x20;   Genre ||--o{ Book : categorises

&#x20;   Book ||--o{ SetBook : has\_prescription\_details

```



\### 3.2 Relationship Explanations



\*\*Genre and Book – One-to-Many\*\*



\- One genre can contain many books.

\- Each book belongs to one genre.

\- `Book.genreId` is the foreign key referencing `Genre.id`.



\*\*Book and SetBook – One-to-Many\*\*



\- A book can have multiple set-book prescription records.

\- Each set-book record belongs to one book.

\- `SetBook.bookId` references `Book.id`.



\*\*User\*\*



\- The User model stores registered users and their roles.

\- The current schema does not define a direct relationship between User and Book or SetBook.



\### 3.3 Database Enums



| Enum | Values |

|---|---|

| Role | PATRON, LIBRARIAN |

| SetBookSubject | ENGLISH, KISWAHILI |

| SetBookCategory | NOVEL, PLAY, SHORT\_STORIES, POETRY, OTHER |

| Curriculum | KCSE\_8\_4\_4, CBC |



Enums help maintain consistent values in the database.



\## 4. Application Startup and Database Connection



The Prisma service is integrated into the NestJS application through a global Prisma module.



\### Startup Flowchart



```mermaid

flowchart TD

&#x20;   A(\[Application Starts]) --> B\[Load NestJS Application]

&#x20;   B --> C\[Load AppModule]

&#x20;   C --> D\[Load PrismaModule]

&#x20;   D --> E\[Create PrismaService]

&#x20;   E --> F\[Read DATABASE\_URL]

&#x20;   F --> G\[Create PostgreSQL Driver Adapter]

&#x20;   G --> H\[Initialize Prisma Client]

&#x20;   H --> I\[Call onModuleInit]

&#x20;   I --> J\[Connect to PostgreSQL]

&#x20;   J --> K{Connection Successful?}

&#x20;   K -->|Yes| L\[Application Ready]

&#x20;   K -->|No| M\[Connection Error]

&#x20;   L --> N(\[Application Runs])

```



\### Explanation



1\. NestJS starts the application.

2\. The application loads its modules.

3\. PrismaModule provides PrismaService.

4\. PrismaService reads the database connection string from the environment.

5\. The PostgreSQL driver adapter is initialized.

6\. Prisma connects to the database through `onModuleInit()`.

7\. The application becomes ready after successful initialization.



When the application shuts down, `onModuleDestroy()` disconnects Prisma from the database.



\## 5. Database Migration and Seeding Workflow



Database migrations maintain the history of structural changes to the database.



The seed script inserts sample data into the database.



\### Migration and Seeding Flowchart



```mermaid

flowchart TD

&#x20;   A(\[Database Setup]) --> B\[Configure DATABASE\_URL]

&#x20;   B --> C\[Define Models in schema.prisma]

&#x20;   C --> D\[Validate Prisma Schema]

&#x20;   D --> E\[Generate Prisma Client]

&#x20;   E --> F\[Create Database Migrations]

&#x20;   F --> G\[Apply Migrations to PostgreSQL]

&#x20;   G --> H\[Run Seed Script]

&#x20;   H --> I\[Create or Update Genres]

&#x20;   I --> J\[Create or Update General Books]

&#x20;   J --> K\[Create or Update SetBook Records]

&#x20;   K --> L\[Verify Database Records]

&#x20;   L --> M(\[Database Ready])

```



\### Explanation



1\. Configure the PostgreSQL connection string.

2\. Define the database models in `schema.prisma`.

3\. Validate the schema.

4\. Generate Prisma Client.

5\. Create migration files when the schema changes.

6\. Apply migrations to the database.

7\. Execute the seed script.

8\. Verify the inserted or updated records.



The seed script uses upsert and lookup operations to avoid creating unnecessary duplicate records when it is executed again.



\## 6. Current Database Catalogue



The seed script populates the database with:



| Data | Seeded records |

|---|---:|

| Genres | 5 |

| General books | 16 |

| Set-book records | 24 |



The 24 set-book records contain additional curriculum and prescription details. They are linked to Book records rather than being treated as separate catalogue books in every case.



\## 7. Project Directory Structure



```text

library-management-system/

│

├── .gitignore

├── README.md

├── architecture.md

│

└── api/

&#x20;   │

&#x20;   ├── prisma/

&#x20;   │   ├── migrations/

&#x20;   │   ├── schema.prisma

&#x20;   │   └── seed.ts

&#x20;   │

&#x20;   ├── src/

&#x20;   │   ├── prisma/

&#x20;   │   │   ├── prisma.module.ts

&#x20;   │   │   └── prisma.service.ts

&#x20;   │   │

&#x20;   │   ├── app.controller.ts

&#x20;   │   ├── app.module.ts

&#x20;   │   ├── app.service.ts

&#x20;   │   └── main.ts

&#x20;   │

&#x20;   ├── test/

&#x20;   ├── prisma.config.ts

&#x20;   ├── package.json

&#x20;   ├── package-lock.json

&#x20;   ├── tsconfig.json

&#x20;   └── .env.example

```



The actual project may contain additional configuration and test files.



\## 8. Security and Data Integrity



The following practices are used:



\- Database connection credentials are stored in environment variables.

\- `.env` files are excluded from Git.

\- `.env.example` provides a safe configuration template.

\- Prisma models define primary keys and foreign-key relationships.

\- Unique constraints prevent duplicate genre names, user emails and non-null ISBN values.

\- Database migrations provide a controlled history of schema changes.

\- Passwords must be securely hashed before storage in a production authentication workflow.



\## 9. Current Implementation and Future Development



\### Implemented



\- NestJS backend foundation.

\- Prisma ORM integration.

\- PostgreSQL database connection.

\- User, Genre, Book and SetBook models.

\- Role and curriculum-related enums.

\- Database migrations.

\- Hosted database deployment.

\- Seed data for genres, general books and set books.

\- Prisma Client generation and TypeScript build verification.



\### Planned Development



\- Book catalogue API endpoints.

\- User registration and authentication.

\- Role-based access control.

\- Book borrowing and returns.

\- Book reviews and ratings.

\- Book search and filtering.

\- Inventory and availability management.



These planned features are not represented as completed functionality in the current database architecture.



\## 10. Conclusion



The Library Management System uses a relational database architecture supported by NestJS and Prisma.



The separation of users, genres, books and set-book prescription records provides a structured foundation for future library functionality.



PostgreSQL provides persistent data storage, while Prisma manages schema definitions, migrations, database relationships and data access.



The architecture is designed to support further development without requiring the existing catalogue structure to be redesigned for every new feature.

