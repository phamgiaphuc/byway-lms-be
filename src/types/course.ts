import { fileSchema } from "@/types/file";
import z from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
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
});

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
export type GetCourseByIdSchema = z.infer<typeof getCourseByIdSchema>;
