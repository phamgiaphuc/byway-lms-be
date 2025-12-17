import { LessonCreateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";

class LessonRepository {
  async createLesson(lesson: LessonCreateInput) {
    return await prisma.lesson.create({
      data: lesson,
      include: {
        video: true,
      },
    });
  }

  async getLessonById(lessonId: string) {
    return await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        video: true,
      },
    });
  }
}

export const lessonRepository = new LessonRepository();
