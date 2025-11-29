import z from "zod";

export interface SignInBody {
  email: string;
  password: string;
}

export const signInSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});
