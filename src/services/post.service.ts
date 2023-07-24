import axios from "axios";

interface GetPostsParams {
  userId?: string;
  currentPage?: number;
  pageSize?: number;
}

const getPosts = async ({
  currentPage,
  userId,
  pageSize,
}: GetPostsParams = {}) => {
  let posts = axios.get(`/api/forum`, {
    params: {
      userId: userId,
      currentPage: currentPage,
      pageSize: pageSize,
    },
  });
};
