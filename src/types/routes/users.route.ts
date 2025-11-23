import { DefaultRoute } from "@/types/routes/route";

export interface UsersRoute extends DefaultRoute {
  getUsers: string;
}

export const usersRoute: UsersRoute = {
  getUsers: "/",
  name: "Users",
  index: "/users",
  default: "/",
  status: "/status",
};
