import { lessonRepository } from "@/repository/lesson.repository";

class LessonService {
  async getLessons(courseId: string) {
    const lessons = await lessonRepository.getLessons(courseId);
    return lessons;
  }

  async getLessonById(lessonId: string) {
    const lesson = await lessonRepository.getLessonById(lessonId);
    return lesson;
  }
}

export const lessonService = new LessonService();
