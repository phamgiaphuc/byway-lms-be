import z from "zod";

export interface SignInBody {
  email: string;
  password: string;
}

export interface SignUpBody {
  email: string;
  password: string;
  name: string;
}

export const signInSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export const signUpSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().min(1),
  }),
});

export const getVerificationSchema = z.object({
  query: z.object({
    userId: z.string(),
  }),
});

export type GetVerificationQuery = z.infer<typeof getVerificationSchema>["query"];
