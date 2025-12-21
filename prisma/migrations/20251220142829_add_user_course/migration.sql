/*
  Warnings:

  - You are about to drop the column `userId` on the `user_lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userCourseId,lessonId]` on the table `user_lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userCourseId` to the `user_lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_lesson" DROP CONSTRAINT "user_lesson_userId_fkey";

-- DropIndex
DROP INDEX "user_lesson_userId_lessonId_key";

-- AlterTable
ALTER TABLE "user_lesson" DROP COLUMN "userId",
ADD COLUMN     "userCourseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_course" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "user_course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_course_userId_courseId_key" ON "user_course"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "user_lesson_userCourseId_lessonId_key" ON "user_lesson"("userCourseId", "lessonId");

-- AddForeignKey
ALTER TABLE "user_course" ADD CONSTRAINT "user_course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_course" ADD CONSTRAINT "user_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_lesson" ADD CONSTRAINT "user_lesson_userCourseId_fkey" FOREIGN KEY ("userCourseId") REFERENCES "user_course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
