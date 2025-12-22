import { LessonCreateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";

class LessonRepository {
  async getLessons(courseId: string) {
    return await prisma.chapter.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        lessons: {
          include: {
            video: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

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

  async deleteLessonById(id: string) {
    return await prisma.lesson.delete({
      where: {
        id,
      },
    });
  }
}

export const lessonRepository = new LessonRepository();
