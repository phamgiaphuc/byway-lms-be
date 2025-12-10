import z from "zod";

export const requestType = {
  TEACHING: "teaching",
  CATEGORY: "category",
  SUPPORT: "support",
} as const;

export type RequestType = (typeof requestType)[keyof typeof requestType];

export const requestStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  REJECTED: "rejected",
} as const;

export type RequestStatus = (typeof requestStatus)[keyof typeof requestStatus];

export const createTeachRequestSchema = z.object({
  body: z.object({
    agree: z.boolean(),
  }),
});

export type CreateTeachRequestSchema = z.infer<typeof createTeachRequestSchema>;
