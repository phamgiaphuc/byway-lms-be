import { DefaultRoute } from "@/types/routes/route";

export interface AuthRoute extends Omit<DefaultRoute, "default"> {
  login: string;
  register: string;
}

export const authRoute: AuthRoute = {
  login: "/login",
  register: "/register",
  name: "Auth",
  index: "/auth",
  status: "/status",
};
