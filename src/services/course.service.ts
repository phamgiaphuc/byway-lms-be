import { courseRepository } from "@/repository/course.repository";
import { CreateCourseSchema } from "@/types/course";

export class CourseService {
  async createCourse(body: CreateCourseSchema["body"], userId: string) {
    const { title, description, level, isFree, isPublished, price, image, categoryIds } = body;
    const course = await courseRepository.createCourse({
      title: title,
      description: description,
      image: {
        create: {
          ext: image.ext,
          name: image.name,
          url: image.url,
        },
      },
      level: level,
      isFree: isFree,
      isPublished: isPublished,
      price: price,
      instructor: {
        connect: {
          id: userId,
        },
      },
      categories: {
        create: categoryIds.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    });
    return course;
  }
}

export const courseService = new CourseService();
