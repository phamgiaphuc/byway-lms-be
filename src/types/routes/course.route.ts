import { DefaultRoute } from "@/types/routes/route";

export interface CourseRoute extends Omit<DefaultRoute, "default"> {
  createCourse: string;
  getCourses: string;
  getCourseById: string;
}

export const courseRoute: CourseRoute = {
  createCourse: "/",
  getCourseById: "/:id",
  getCourses: "/",
  name: "Course",
  index: "/courses",
  status: "/status",
};
