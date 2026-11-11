-- CreateEnum
CREATE TYPE "SetBookSubject" AS ENUM ('ENGLISH', 'KISWAHILI');

-- CreateEnum
CREATE TYPE "SetBookCategory" AS ENUM ('NOVEL', 'PLAY', 'SHORT_STORIES', 'POETRY', 'OTHER');

-- CreateEnum
CREATE TYPE "Curriculum" AS ENUM ('KCSE_8_4_4', 'CBC');

-- CreateTable
CREATE TABLE "SetBook" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "subject" "SetBookSubject" NOT NULL,
    "category" "SetBookCategory" NOT NULL,
    "curriculum" "Curriculum" NOT NULL,
    "classLevel" TEXT NOT NULL,
    "publisher" TEXT,
    "isCompulsory" BOOLEAN NOT NULL DEFAULT true,
    "prescribedFromYear" INTEGER NOT NULL,
    "prescribedToYear" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SetBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SetBook_subject_curriculum_idx" ON "SetBook"("subject", "curriculum");

-- CreateIndex
CREATE INDEX "SetBook_prescribedFromYear_prescribedToYear_idx" ON "SetBook"("prescribedFromYear", "prescribedToYear");

-- AddForeignKey
ALTER TABLE "SetBook" ADD CONSTRAINT "SetBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
