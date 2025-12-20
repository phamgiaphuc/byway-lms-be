import { CourseCreateInput, CourseWhereInput } from "@/lib/generated/prisma/models";
import { prisma } from "@/lib/prisma";

class CourseRepository {
  async getCourses(where: CourseWhereInput) {
    return await prisma.course.findMany({
      where: where,
      include: {
        image: true,
        instructor: true,
        categories: {
          include: {
            category: true,
          },
        },
        chapters: true,
      },
    });
  }

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
        chapters: {
          include: {
            lessons: true,
          },
        },
      },
    });
  }

  async getPublishedCourseById(id: string) {
    return await prisma.course.findUnique({
      where: {
        id: id,
        isPublished: true,
      },
      include: {
        image: true,
        categories: {
          include: {
            category: true,
          },
        },
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            lessons: {
              where: {
                isPublished: true,
              },
            },
          },
        },
        instructor: true,
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
