import { DefaultRoute } from "@/types/routes/route";

export interface UsersRoute extends DefaultRoute {
  getUsers: string;
  getMe: string;
  enrollCourse: string;
  getMyCourses: string;
}

export const usersRoute: UsersRoute = {
  getUsers: "/",
  enrollCourse: "/courses/:courseId/enroll",
  getMyCourses: "/me/courses",
  name: "Users",
  index: "/users",
  default: "/",
  status: "/status",
  getMe: "/me",
};
