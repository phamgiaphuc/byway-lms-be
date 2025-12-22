import { DefaultRoute } from "@/types/routes/route";

export interface UsersRoute extends DefaultRoute {
  getUsers: string;
  getMe: string;
  enrollCourse: string;
  getMyCourses: string;
  getMyLessons: string;
  completeLesson: string;
  getMyRequests: string;
}

export const usersRoute: UsersRoute = {
  getUsers: "/",
  enrollCourse: "/courses/:courseId/enroll",
  getMyCourses: "/me/courses",
  getMyLessons: "/me/lessons",
  completeLesson: "/lessons/complete",
  getMyRequests: "/me/requests",
  name: "Users",
  index: "/users",
  default: "/",
  status: "/status",
  getMe: "/me",
};
