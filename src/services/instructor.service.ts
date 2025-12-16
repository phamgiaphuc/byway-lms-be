import { BadRequestError, NotFoundError } from "@/lib/api-error";
import { chatperRepository } from "@/repository/chapter.repository";
import { courseRepository } from "@/repository/course.repository";
import { UserPayload } from "@/types/auth";
import { CreateChapterSchema, GetChaptersSchema, UpdateChapterSchema } from "@/types/chapter";

class InstructorService {
  async getCourses(user: UserPayload) {
    const courses = await courseRepository.getCoursesByUserId(user.id);
    return courses.map((course) => ({
      ...course,
      categories: course.categories.map((category) => ({
        ...category.category,
      })),
    }));
  }

  async getCourseById(user: UserPayload, id: string) {
    const course = await courseRepository.getCourseById(id);
    if (!course) {
      throw new NotFoundError("Course not found");
    }
    if (course.instructorId !== user.id) {
      throw new BadRequestError("Course is not allowed");
    }
    return {
      ...course,
      categories: course.categories.map((category) => ({
        ...category.category,
      })),
    };
  }

  async createChapter(body: CreateChapterSchema["body"]) {
    const chapter = await chatperRepository.createChapter({
      title: body.title,
      isPublished: body.isPublished,
      course: {
        connect: {
          id: body.courseId,
        },
      },
    });
    return chapter;
  }

  async getChapters(query: GetChaptersSchema["query"]) {
    const chapters = await chatperRepository.getChapters({
      courseId: query.courseId,
    });
    return chapters;
  }

  async updateChapterById(user: UserPayload, id: string, body: UpdateChapterSchema["body"]) {
    const chapter = await chatperRepository.getChapterById(id);
    if (!chapter) {
      throw new NotFoundError("Chapter not found");
    }
    if (chapter.course.instructorId !== user.id) {
      throw new BadRequestError("Chapter is not allowed");
    }
    return await chatperRepository.updateChapterById(id, {
      title: body.title,
      isPublished: body.isPublished,
    });
  }
}

export const instructorService = new InstructorService();
