import { ForumGET, ForumPOST } from "@/app/api/forum/route";
import { ForumPostSchemaType } from "@/app/api/forum/schema";
import { SerializedStateDates } from "@/types/generic";
import axios from "axios";

interface GetPostsParams {
  userId?: string;
  skip?: number;
  pageSize?: number;
}

interface editPostsParams {
  postData: {
    postTitle: string;
    postBody: string;
    postId: string;
  };
}
interface editCommentParams {
  postData: {
    postBody: string;
    CommentId: string;
    commentPosterId: string;
  };
}

export type Post = SerializedStateDates<ForumGET>["posts"][0];

export const getPosts = async ({
  skip,
  userId,
  pageSize,
}: GetPostsParams = {}) => {
  let res = await axios.get<SerializedStateDates<ForumGET>>(`/api/forum`, {
    params: {
      userId: userId,
      skip: skip,
      pageSize: pageSize,
    },
  });

  return res.data;
};

type CreatePostsParams = ForumPostSchemaType;

// postTitle: string;
// postBody: number;

export const createPost = async ({
  postTitle,
  postBody,
}: CreatePostsParams) => {
  const res = await axios.post<ForumPOST>("/api/forum", {
    postTitle,
    postBody,
  });
};

export const editPost = async ({ postData }: editPostsParams) => {
  const res = await axios.patch<ForumPOST>("/api/forum", {
    ...postData,
  });
};
export const editComment = async ({ postData }: editCommentParams) => {
  console.log("postData");
  const res = await axios.patch<ForumPOST>("/api/forum/comments", {
    ...postData,
  });
};
