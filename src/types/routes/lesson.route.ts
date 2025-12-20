import { DefaultRoute } from "@/types/routes/route";

export interface LessonRoute extends Omit<DefaultRoute, "default"> {
  getLessons: string;
}

export const lessonRoute: LessonRoute = {
  getLessons: "/",
  name: "Lesson",
  index: "/lessons",
  status: "/status",
};
