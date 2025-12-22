import { NotFoundError } from "@/lib/api-error";
import { CourseWhereInput } from "@/lib/generated/prisma/models";
import { normalizeArray } from "@/lib/helper";
import { courseRepository } from "@/repository/course.repository";
import { CreateCourseSchema, GetCourseByIdSchema, GetCoursesSchema, UpdateCourseByIdSchema } from "@/types/course";

export class CourseService {
  async createCourse(body: CreateCourseSchema["body"], userId: string) {
    const { title, description, level, isFree, isPublished, price, image, categoryIds, subtitle } = body;
    const course = await courseRepository.createCourse({
      title: title,
      subtitle: subtitle,
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

  async updateCourseById(body: UpdateCourseByIdSchema["body"], courseId: string) {
    const { title, description, level, isFree, isPublished, price, image, categoryIds, subtitle } = body;
    return await courseRepository.updateCourseById(
      {
        title: title,
        subtitle: subtitle,
        description: description,
        image: {
          update: {
            where: { id: image.id },
            data: {
              ext: image.ext,
              name: image.name,
              url: image.url,
            },
          },
        },
        level: level,
        isFree: isFree,
        isPublished: isPublished,
        price: price,
        categories: {
          set: categoryIds.map((id) => ({
            courseId_categoryId: {
              courseId,
              categoryId: id,
            },
          })),
        },
      },
      courseId,
    );
  }

  async getCourseById(params: GetCourseByIdSchema["params"], query: GetCourseByIdSchema["query"]) {
    const course = await courseRepository.getPublishedCourseById(params.id, query.detail);
    if (!course) {
      throw new NotFoundError("Course not found");
    }
    return {
      ...course,
      categories: course.categories.map((c) => c.category),
    };
  }

  async getCourses(query: GetCoursesSchema["query"]) {
    const categoryIds = normalizeArray(query.categoryIds);
    const prices = normalizeArray(query.prices);
    const priceFilters: CourseWhereInput[] =
      prices
        ?.map((price): CourseWhereInput | null => {
          switch (price) {
            case "free":
              return { price: 0 };

            case "under-20":
              return { price: { lt: 20 } };

            case "20-50":
              return { price: { gte: 20, lte: 50 } };

            case "50-100":
              return { price: { gte: 50, lte: 100 } };

            case "over-100":
              return { price: { gt: 100 } };

            default:
              return null;
          }
        })
        .filter((f): f is CourseWhereInput => f !== null) ?? [];
    const courses = await courseRepository.getCourses({
      isPublished: true,
      ...(categoryIds && {
        categories: {
          some: {
            categoryId: { in: categoryIds },
          },
        },
      }),
      ...(priceFilters.length && {
        OR: priceFilters,
      }),
    });
    return courses.map((course) => ({
      ...course,
      categories: course.categories.map((c) => c.category),
    }));
  }
}

export const courseService = new CourseService();
