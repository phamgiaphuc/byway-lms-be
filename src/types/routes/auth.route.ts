import { DefaultRoute } from "@/types/routes/route";

export interface AuthRoute extends Omit<DefaultRoute, "default"> {
  signIn: string;
  signUp: string;
  verify: string;
  sendVerification: string;
  google: string;
}

export const authRoute: AuthRoute = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  verify: "/verify",
  sendVerification: "/send-verification",
  google: "/google",
  name: "Auth",
  index: "/auth",
  status: "/status",
};
