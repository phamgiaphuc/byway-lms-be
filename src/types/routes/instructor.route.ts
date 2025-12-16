import { DefaultRoute } from "@/types/routes/route";

export interface InstructorRoute extends Omit<DefaultRoute, "default"> {
  getCourses: string;
  getCourseById: string;
  createChapter: string;
  getChapters: string;
  updateChapterById: string;
}

export const instructorRoute: InstructorRoute = {
  getCourses: "/courses",
  getCourseById: "/courses/:id",
  createChapter: "/chapters",
  getChapters: "/chapters",
  updateChapterById: "/chapters/:id",
  name: "Instructor",
  index: "/instructor",
  status: "/status",
};
