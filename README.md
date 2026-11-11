\# Library Management System



\## 1. Project Overview



The Library Management System is a backend application designed to manage a library's book catalogue and related information.



The system uses NestJS, Prisma ORM and PostgreSQL. It provides a structured relational data layer for managing books, genres, users and prescribed school set books.



\## 2. Technology Stack



\- \*\*Backend framework:\*\* NestJS

\- \*\*Programming language:\*\* TypeScript

\- \*\*ORM:\*\* Prisma 7

\- \*\*Database:\*\* PostgreSQL

\- \*\*Hosted database:\*\* Supabase PostgreSQL

\- \*\*Database driver:\*\* PostgreSQL with Prisma driver adapter



\## 3. Project Structure



```text

library-management-system/

│

├── .gitignore

├── README.md

│

└── api/

&#x20;   ├── prisma/

&#x20;   │   ├── migrations/

&#x20;   │   ├── schema.prisma

&#x20;   │   └── seed.ts

&#x20;   │

&#x20;   ├── src/

&#x20;   │   ├── prisma/

&#x20;   │   │   ├── prisma.module.ts

&#x20;   │   │   └── prisma.service.ts

&#x20;   │   ├── app.controller.ts

&#x20;   │   ├── app.module.ts

&#x20;   │   ├── app.service.ts

&#x20;   │   └── main.ts

&#x20;   │

&#x20;   ├── prisma.config.ts

&#x20;   ├── package.json

&#x20;   └── .env.example

```



\## 4. Database Models



\### User



Stores registered system users.



Important fields:

\- `id`

\- `name`

\- `email`

\- `password`

\- `role`

\- `createdAt`

\- `updatedAt`



The Role enum defines two user roles:



\- `PATRON`

\- `LIBRARIAN`



\### Genre



Stores book categories.



Important fields:

\- `id`

\- `name`

\- `description`

\- `createdAt`

\- `updatedAt`



A genre can be associated with multiple books.



\### Book



Stores the library's book catalogue.



Important fields:

\- `id`

\- `title`

\- `author`

\- `isbn`

\- `publicationYear`

\- `totalCopies`

\- `availableCopies`

\- `genreId`

\- `createdAt`

\- `updatedAt`



Each book belongs to one genre.



\### SetBook



Stores additional information about prescribed secondary-school literature.



It links to a Book and records:

\- Subject

\- Category

\- Curriculum

\- Class level

\- Publisher

\- Compulsory status, where known

\- Prescription start and end years

\- Notes



The system includes enums for set-book subjects, categories and curriculum types.



\## 5. Schema Decisions



\### Why Book references Genre



The Book model uses a `genreId` foreign key to reference the Genre model instead of storing the genre name directly inside each book.



This relational design provides several benefits:



1\. \*\*Reduces duplication:\*\* Genre names and descriptions are stored once.

2\. \*\*Maintains consistency:\*\* A book can only reference an existing genre through its foreign key.

3\. \*\*Simplifies updates:\*\* Changing a genre description does not require updating every book.

4\. \*\*Supports queries:\*\* Prisma relations make it possible to retrieve books together with their associated genres.



This design follows relational database principles and makes the catalogue easier to maintain.



\### Why SetBook is a separate model



Set-book information contains additional details that do not apply to every book, such as curriculum, class level and prescription period.



Keeping these details in a separate model avoids adding curriculum-specific fields to every ordinary book.



\## 6. Database Setup



\### Prerequisites



Install:



\- Node.js

\- npm

\- PostgreSQL database or a hosted PostgreSQL service

\- Git



\### Install dependencies



Open a terminal in the `api` directory:



```bash

cd api

npm install

```



\### Configure environment variables



Create a `.env` file using `.env.example` as a template.



Set `DATABASE\_URL` to your PostgreSQL connection string.



Do not commit `.env` or expose database credentials.



\### Generate Prisma Client



```bash

npx prisma generate

```



\### Apply database migrations



For an already-created migration history:



```bash

npx prisma migrate deploy

```



\### Seed the database



```bash

npx prisma db seed

```



The seed script creates or updates the sample genres, general books and set-book records.



\## 7. Running the API



From the `api` directory:



```bash

npm run start:dev

```



The NestJS application runs in development mode.



\## 8. Validation and Build



Validate the Prisma schema:



```bash

npx prisma validate

```



Check TypeScript files:



```bash

npx tsc --noEmit

```



Build the API:



```bash

npm run build

```



\## 9. Database Migrations



Database schema changes are tracked in:



```text

api/prisma/migrations/

```



Each migration records a database structure change and allows the schema history to be reproduced in another environment.



\## 10. Assignment Deliverables



The project combines the shared requirements of Assignment 1 and Assignment 2:



\- Prisma models for Book, Genre and User.

\- Role enum with PATRON and LIBRARIAN.

\- Relational Book-to-Genre association.

\- Hosted PostgreSQL database.

\- Database migrations.

\- Seed data containing at least 15 books across at least four genres.

\- Prisma service integrated into NestJS.

\- Documented database schema decisions.

\- Additional SetBook model for curriculum-specific literature information.



\## 11. Security Notes



\- Database credentials are stored in environment variables.

\- `.env` files are excluded from Git.

\- Generated dependencies and build artefacts are excluded from Git.

\- Passwords must be securely hashed before being stored in the database.



\## 12. Future Development



Potential next development stages include:



\- Book catalogue API endpoints.

\- User registration and authentication.

\- Role-based access control.

\- Book borrowing and returns.

\- Book reviews and ratings.

\- Search and filtering.

\- Library inventory management.

