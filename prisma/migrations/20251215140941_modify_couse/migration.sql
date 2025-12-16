/*
  Warnings:

  - You are about to drop the column `image` on the `course` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
