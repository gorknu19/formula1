import { ForumGET } from "@/app/api/forum/route";
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
