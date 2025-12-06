import { JwtPayload } from "jsonwebtoken";
import { Profile } from "passport-google-oauth20";
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

export type GoogleProfile = Profile["_json"] & {
  email: string;
};

export type UserPayload = JwtPayload & {
  id: string;
  email: string;
};

export const signInSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(1),
  }),
});

export const signUpSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().min(1),
  }),
});

export const sendVerificationSchema = z.object({
  body: z.object({
    userId: z.string(),
  }),
});

export const postVerificationSchema = z.object({
  body: z.object({
    code: z.string(),
    userId: z.string(),
    verificationId: z.string(),
  }),
});

export type SendVerification = z.infer<typeof sendVerificationSchema>;
export type PostVerification = z.infer<typeof postVerificationSchema>;
