import { z } from "zod";

export const forumCommentSchema = z.object({
  postTitle: z.string().min(3),
  postBody: z.string().min(10),
});
