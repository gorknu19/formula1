import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export let CommentsHook = (postId: string) => {
  const urlParams = new URLSearchParams();

  urlParams.append("postId", postId);

  let { data, error, mutate } = useSWR(
    `/api/forum/comments?${urlParams.toString()}`,
    fetcher,
  );

  let loading = !data && !error;

  return {
    comments: data,
    error,
    loading,
    mutate,
  };
};
