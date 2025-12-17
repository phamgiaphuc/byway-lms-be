import { BadRequestError, NotFoundError } from "@/lib/api-error";
import { chatperRepository } from "@/repository/chapter.repository";
import { courseRepository } from "@/repository/course.repository";
import { lessonRepository } from "@/repository/lesson.repository";
import { UserPayload } from "@/types/auth";
import { CreateChapterSchema, GetChapterByIdSchema, GetChaptersSchema, UpdateChapterSchema } from "@/types/chapter";
import { CreateLessonSchema } from "@/types/lesson";

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

  async getChapterById(params: GetChapterByIdSchema["params"]) {
    const chapter = await chatperRepository.getChapterById(params.id);
    return chapter;
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

  async createLesson(body: CreateLessonSchema["body"]) {
    const { title, description, video, position, type, content, chapterId } = body;
    const lesson = await lessonRepository.createLesson({
      title: title,
      description: description,
      position: position,
      type: type,
      content: content,
      chapter: {
        connect: {
          id: chapterId,
        },
      },
      ...(video && {
        video: {
          create: {
            ext: video.ext,
            name: video.name,
            url: video.url,
          },
        },
      }),
    });
    return lesson;
  }
}

export const instructorService = new InstructorService();
