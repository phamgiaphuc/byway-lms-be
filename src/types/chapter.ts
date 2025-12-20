import z from "zod";

export const createChapterSchema = z.object({
  body: z.object({
    courseId: z.uuid(),
    title: z.string(),
    isPublished: z.boolean(),
  }),
});

export const getChaptersSchema = z.object({
  query: z.object({
    courseId: z.uuid(),
  }),
});

export const getChapterByIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

export const updateChapterSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    title: z.string(),
    isPublished: z.boolean(),
  }),
});

export const deleteChapterByIdSchema = z.object({
  params: z.object({
    id: z.uuid(),
  }),
});

export type CreateChapterSchema = z.infer<typeof createChapterSchema>;

export type GetChaptersSchema = z.infer<typeof getChaptersSchema>;

export type UpdateChapterSchema = z.infer<typeof updateChapterSchema>;

export type GetChapterByIdSchema = z.infer<typeof getChapterByIdSchema>;

export type DeleteChapterByIdSchema = z.infer<typeof deleteChapterByIdSchema>;
