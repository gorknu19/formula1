import { PostGet } from '@/app/api/forum/route';
import { Fetcher } from 'swr';

export interface GetPostsParams {
  page: number;
  pageSize: number;
}
const getPosts = async ({ page, pageSize }: GetPostsParams) => {
  // `/api/forum?${urlParams.toString()}`,
  const urlParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const res = await fetch(`/api/forum?${urlParams.toString()}`);
  const data = await res.json();
  return data;
};

export default getPosts;
