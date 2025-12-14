import { INSTRUCTOR_ROLE, USER_ROLE } from "@/constants/role";
import z from "zod";

export const requestType = {
  TEACHING: "teaching",
  CATEGORY: "category",
  SUPPORT: "support",
} as const;

export type RequestType = (typeof requestType)[keyof typeof requestType];

export const requestStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type RequestStatus = (typeof requestStatus)[keyof typeof requestStatus];

export const createTeachRequestSchema = z.object({
  body: z.object({
    agree: z.boolean(),
  }),
});

export type CreateTeachRequestSchema = z.infer<typeof createTeachRequestSchema>;

export const roleRequestSchema = z.object({
  body: z.object({
    requestId: z.uuid(),
    userId: z.uuid(),
    role: z.enum([USER_ROLE, INSTRUCTOR_ROLE]),
    status: z.enum([requestStatus.APPROVED, requestStatus.REJECTED]),
    response: z.string().trim().min(1, "Response is required").max(1000).optional(),
  }),
});

export type RoleRequestSchema = z.infer<typeof roleRequestSchema>;
