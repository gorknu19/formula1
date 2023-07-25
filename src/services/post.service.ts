import { ForumGET, ForumPOST } from "@/app/api/forum/route";
import { ForumPostSchemaType } from "@/app/api/forum/schema";
import { SerializedStateDates } from "@/types/generic";
import axios from "axios";

interface GetPostsParams {
  userId?: string;
  skip?: number;
  pageSize?: number;
}

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
