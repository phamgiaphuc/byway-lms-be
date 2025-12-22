import { BadRequestError, NotFoundError, UnauthorizedError } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { userRepository } from "@/repository/user.repository";

class UserService {
  async getUserProfile(id: string) {
    const user = await userRepository.findUserProfileById(id);
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    return user;
  }

  async enrollCourse(userId: string, courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course || !course.isPublished) {
      throw new NotFoundError("Course not found");
    }
    const existed = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    if (existed) {
      throw new BadRequestError("User already enrolled in this course");
    }
    return prisma.userCourse.create({
      data: {
        userId,
        courseId,
      },
    });
  }

  async getMyCourses(userId: string) {
    const data = await prisma.userCourse.findMany({
      where: { userId },
      orderBy: { enrolledAt: "desc" },
      include: {
        course: {
          include: {
            image: true,
            instructor: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    return Promise.all(
      data.map(async (c) => {
        const lesson = await prisma.lesson.findFirst({
          where: {
            chapter: {
              courseId: c.courseId,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
          },
        });
        return {
          ...c,
          course: {
            ...c.course,
            categories: c.course.categories.map((c) => c.category),
          },
          lessonId: lesson?.id ?? null,
        };
      }),
    );
  }

  async getMyLessons(userId: string, courseId: string) {
    const userCourse = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    if (!userCourse) {
      throw new NotFoundError("User course not found");
    }
    const lessons = await prisma.userLesson.findMany({
      where: {
        userCourseId: userCourse.id,
      },
    });
    return lessons;
  }

  async completeLesson(lessonId: string, courseId: string, userId: string) {
    const userCourse = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    if (!userCourse) {
      throw new NotFoundError("User course not found");
    }
    let userLesson = await prisma.userLesson.findUnique({
      where: {
        userCourseId_lessonId: {
          userCourseId: userCourse.id,
          lessonId: lessonId,
        },
      },
    });
    if (!userLesson) {
      userLesson = await prisma.userLesson.create({
        data: {
          userCourseId: userCourse.id,
          lessonId: lessonId,
          isCompleted: true,
          progress: 100,
        },
      });
    }
    return userLesson;
  }

  async getMyRequests(userId: string) {
    return await prisma.request.findMany({
      where: {
        userId,
      },
    });
  }
}

export const userService = new UserService();
