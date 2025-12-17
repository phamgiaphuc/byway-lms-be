-- DropForeignKey
ALTER TABLE "lesson" DROP CONSTRAINT "lesson_videoId_fkey";

-- AlterTable
ALTER TABLE "lesson" ALTER COLUMN "videoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE CASCADE;
