import { z } from "zod";

export const forumPostSchema = z.object({
  postTitle: z.string().min(3),
  postBody: z.string().min(10),
});

export type ForumPostSchemaType = z.infer<typeof forumPostSchema>;
