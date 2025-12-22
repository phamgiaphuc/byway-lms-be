import { fileSchema } from "@/types/file";
import z from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required").max(200, "Subtitle must be at most 200 characters"),
    description: z.string().min(1, "Description is required"),
    image: fileSchema,
    isFree: z.boolean(),
    price: z.number(),
    isPublished: z.boolean(),
    level: z.enum(["beginner", "intermediate", "expert"]),
    categoryIds: z.array(z.uuid()).min(1, "Select at least one category"),
  }),
});

export const updateCourseByIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().min(1, "Subtitle is required").max(200, "Subtitle must be at most 200 characters"),
    description: z.string().min(1, "Description is required"),
    image: fileSchema,
    isFree: z.boolean(),
    price: z.number(),
    isPublished: z.boolean(),
    level: z.enum(["beginner", "intermediate", "expert"]),
    categoryIds: z.array(z.uuid()).min(1, "Select at least one category"),
  }),
});

export const getCourseByIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  query: z.object({
    detail: z
      .enum(["true", "false"])
      .optional()
      .transform((v) => v === "true"),
  }),
});

export const getCoursesSchema = z.object({
  query: z.object({
    categoryIds: z.union([z.uuid(), z.array(z.uuid())]).optional(),
    ratings: z.array(z.number()).optional(),
    prices: z.union([z.string(), z.array(z.string())]).optional(),
  }),
});

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
export type GetCourseByIdSchema = z.infer<typeof getCourseByIdSchema>;
export type GetCoursesSchema = z.infer<typeof getCoursesSchema>;
export type UpdateCourseByIdSchema = z.infer<typeof updateCourseByIdSchema>;
