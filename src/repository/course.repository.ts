import { CourseCreateInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";

class CourseRepository {
  async getCourseById(id: string) {
    return await prisma.course.findUnique({
      where: {
        id: id,
      },
      include: {
        image: true,
        categories: {
          include: {
            category: true,
          },
        },
        chapters: true,
      },
    });
  }

  async getCoursesByUserId(userId: string) {
    return await prisma.course.findMany({
      where: {
        instructorId: userId,
      },
      include: {
        image: true,
        categories: {
          include: {
            category: true,
          },
        },
        chapters: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createCourse(course: CourseCreateInput) {
    return await prisma.course.create({
      data: course,
      include: {
        image: true,
        categories: true,
      },
    });
  }
}

export const courseRepository = new CourseRepository();
