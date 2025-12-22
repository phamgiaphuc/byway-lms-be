import { CourseCreateInput, CourseUpdateInput, CourseWhereInput } from "@/lib/generated/prisma/models";
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

  async getCourseById(id: string, detail?: boolean) {
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
        chapters: detail && {
          include: {
            lessons: true,
          },
        },
      },
    });
  }

  async getPublishedCourseById(id: string, detail?: boolean) {
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
        chapters: detail && {
          where: {
            isPublished: true,
          },
          orderBy: {
            createdAt: "asc",
          },
          include: {
            lessons: {
              where: {
                isPublished: true,
              },
              select: {
                id: true,
                title: true,
                type: true,
              },
              orderBy: {
                createdAt: "asc",
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

  async updateCourseById(course: CourseUpdateInput, courseId: string) {
    return await prisma.course.update({
      where: {
        id: courseId,
      },
      data: course,
    });
  }
}

export const courseRepository = new CourseRepository();
