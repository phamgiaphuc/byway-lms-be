import { optionalFileSchema } from "@/types/file";
import z from "zod";

export const createLessonSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    video: optionalFileSchema,
    isPublished: z.boolean(),
    type: z.enum(["lecture", "video"]),
    chapterId: z.string(),
    position: z.number(),
  }),
});

export type CreateLessonSchema = z.infer<typeof createLessonSchema>;
