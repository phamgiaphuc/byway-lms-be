/*
  Warnings:

  - Added the required column `chapterId` to the `lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lesson" ADD COLUMN     "chapterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
