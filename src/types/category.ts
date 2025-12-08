import { fileSchema } from "@/types/file";
import z from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string(),
    image: fileSchema,
  }),
});

export const getCategoryBySlugSchema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export type GetCategoryBySlugSchema = z.infer<typeof getCategoryBySlugSchema>;
