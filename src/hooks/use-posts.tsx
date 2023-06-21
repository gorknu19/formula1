import useSWR, { Fetcher } from 'swr';
import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { PostGet } from '@/app/api/forum/route';
import getPosts, { GetPostsParams } from '@/lib/get-posts';
import { toast } from 'react-toastify';

export const fetcher: Fetcher<PostGet, GetPostsParams> = (params) =>
  getPosts(params);

let UsePosts = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  let { data, error, mutate } = useSWR(
    { page: currentPage, pageSize },
    fetcher,
  );

  let loading = !data && !error;

  const nextPage = () => {
    if (data && data?.postsLength / pageSize <= currentPage) {
      toast.error('Already on last page!');
      return console.log('Already on last page!');
    }
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage === 1) {
      toast.error('Already on page 1!');
      return console.log('cant go to page 0');
    }
    setCurrentPage(currentPage - 1);
  };

  const maxPage = (data && data?.postsLength / pageSize) || 1;

  return {
    allPosts: data?.posts,
    error,
    loading,
    mutate,
    nextPage,
    prevPage,
    maxPage,
    currentPage,
  };
};

export default UsePosts;
