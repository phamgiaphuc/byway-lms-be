import { DefaultRoute } from "@/types/routes/route";

export interface CourseRoute extends Omit<DefaultRoute, "default"> {
  createCourse: string;
  getCourses: string;
  getCourseById: string;
  updateCourseById: string;
}

export const courseRoute: CourseRoute = {
  createCourse: "/",
  getCourseById: "/:id",
  updateCourseById: "/:id",
  getCourses: "/",
  name: "Course",
  index: "/courses",
  status: "/status",
};
