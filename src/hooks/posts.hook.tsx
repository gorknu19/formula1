import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export let PostsHook = (userId: string) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const urlParams = new URLSearchParams();
  console.log(userId);
  urlParams.append("page", currentPage.toString());
  urlParams.append("pageSize", pageSize.toString());
  if (userId.length > 15) urlParams.append("userId", userId);

  // if (userId?.length > 10) {
  //   console.log(userId);
  // }
  let { data, error, mutate } = useSWR(
    `/api/forum?${urlParams.toString()}`,
    fetcher,
  );

  let loading = !data && !error;

  const nextPage = () => {
    if (data && data.postsLength / pageSize <= currentPage) {
      toast.error("Already on last page!");
      return console.log("Already on last page!");
    }
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage === 1) {
      toast.error("Already on page 1!");
      return console.log("cant go to page 0");
    }
    setCurrentPage(currentPage - 1);
  };
  console.log(data?.posts.length);
  const maxPage = data && data.postsLength / pageSize;

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
