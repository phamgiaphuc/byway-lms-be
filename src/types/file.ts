import z from "zod";

export const fileSchema = z.object({
  id: z.string().default(""),
  ext: z.string(),
  name: z.string(),
  url: z.url(),
});

export const optionalFileSchema = z
  .object({
    id: z.string().default(""),
    ext: z.string(),
    name: z.string(),
    url: z.url(),
  })
  .optional();
