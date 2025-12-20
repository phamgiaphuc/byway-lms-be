import { DefaultRoute } from "@/types/routes/route";

export interface InstructorRoute extends Omit<DefaultRoute, "default"> {
  getCourses: string;
  getCourseById: string;
  deleteCourseById: string;
  createChapter: string;
  getChapters: string;
  getChapterById: string;
  deleteChapterById: string;
  updateChapterById: string;
  createLesson: string;
  getLessonById: string;
  deleteLessonById: string;
}

export const instructorRoute: InstructorRoute = {
  getCourses: "/courses",
  getCourseById: "/courses/:id",
  deleteCourseById: "/courses/:id",
  createChapter: "/chapters",
  getChapters: "/chapters",
  updateChapterById: "/chapters/:id",
  getChapterById: "/chapters/:id",
  deleteChapterById: "/chapters/:id",
  createLesson: "/lessons",
  getLessonById: "/lessons/:id",
  deleteLessonById: "/lessons/:id",
  name: "Instructor",
  index: "/instructor",
  status: "/status",
};
