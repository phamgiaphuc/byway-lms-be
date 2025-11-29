import { DefaultRoute } from "@/types/routes/route";

export interface AuthRoute extends Omit<DefaultRoute, "default"> {
  signIn: string;
  signUp: string;
  register: string;
}

export const authRoute: AuthRoute = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  register: "/register",
  name: "Auth",
  index: "/auth",
  status: "/status",
};
