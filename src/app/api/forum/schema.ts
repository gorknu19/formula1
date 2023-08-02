import { z } from "zod";

export const forumPostSchema = z.object({
  postTitle: z.string().min(3),
  postBody: z.string().min(10),
});
export const forumPostEditSchema = forumPostSchema.merge(
  z.object({
    postId: z
      .string()
      .regex(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      ),
  }),
);
export const forumCommentEditSchema = z.object({
  postBody: z.string().min(10),
  CommentId: z.string(),
  commentPosterId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    ),
  // .regex(
  //   /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  // ),
});

export const forumCommentSchema = z.object({
  postBody: z.string().min(10),
  postId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    ),
});

export type ForumPostSchemaType = z.infer<typeof forumPostSchema>;
export type ForumCommentSchemaType = z.infer<typeof forumCommentSchema>;
export type ForumPostEditSchemaType = z.infer<typeof forumPostEditSchema>;
export type ForumCommentEditSchemaType = z.infer<typeof forumCommentEditSchema>;
