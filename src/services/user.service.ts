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
    return prisma.userCourse.findMany({
      where: {
        userId,
      },
      orderBy: {
        enrolledAt: "desc",
      },
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
          },
        },
      },
    });
  }
}

export const userService = new UserService();
