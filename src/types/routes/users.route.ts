import { DefaultRoute } from "@/types/routes/route";

export interface UsersRoute extends DefaultRoute {
  getUsers: string;
  getMe: string;
}

export const usersRoute: UsersRoute = {
  getUsers: "/",
  name: "Users",
  index: "/users",
  default: "/",
  status: "/status",
  getMe: "/me",
};
