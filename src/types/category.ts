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

export const updateCategoryByIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    image: fileSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const getCategoriesSchema = z.object({
  query: z.object({
    keyword: z.string().optional(),
  }),
});

export const deleteCategoriesSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export type GetCategoryBySlugSchema = z.infer<typeof getCategoryBySlugSchema>;

export type UpdateCategoryByIdSchema = z.infer<typeof updateCategoryByIdSchema>;

export type GetCategoriesSchema = z.infer<typeof getCategoriesSchema>;

export type DeleteCategoriesSchema = z.infer<typeof deleteCategoriesSchema>;
