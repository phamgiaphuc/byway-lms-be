import { DefaultRoute } from "@/types/routes/route";

export interface AuthRoute extends Omit<DefaultRoute, "default"> {
  signIn: string;
  signUp: string;
  verify: string;
}

export const authRoute: AuthRoute = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  verify: "/verify",
  name: "Auth",
  index: "/auth",
  status: "/status",
};
