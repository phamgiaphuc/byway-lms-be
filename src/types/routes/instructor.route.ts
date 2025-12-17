import { DefaultRoute } from "@/types/routes/route";

export interface InstructorRoute extends Omit<DefaultRoute, "default"> {
  getCourses: string;
  getCourseById: string;
  createChapter: string;
  getChapters: string;
  getChapterById: string;
  updateChapterById: string;
  createLesson: string;
  getLessonById: string;
}

export const instructorRoute: InstructorRoute = {
  getCourses: "/courses",
  getCourseById: "/courses/:id",
  createChapter: "/chapters",
  getChapters: "/chapters",
  updateChapterById: "/chapters/:id",
  getChapterById: "/chapters/:id",
  createLesson: "/lessons",
  getLessonById: "/lessons/:id",
  name: "Instructor",
  index: "/instructor",
  status: "/status",
};
