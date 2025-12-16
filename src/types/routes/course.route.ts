import { DefaultRoute } from "@/types/routes/route";

export interface CourseRoute extends Omit<DefaultRoute, "default"> {
  createCourse: string;
}

export const courseRoute: CourseRoute = {
  createCourse: "/",
  name: "Course",
  index: "/courses",
  status: "/status",
};
