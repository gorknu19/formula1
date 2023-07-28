"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { LoginButton, LogoutButton } from "@/components/buttons.component";
import { ToastContainer, toast } from "react-toastify";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { createPost, handleDelete, handleEdit } from "./fetchrequests/posts";
import { createComment } from "./fetchrequests/comments";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Posts, Comment } from "@/types/forum/forum.types";
import Comments from "@/components/comments";
import { PostsHook } from "@/hooks/posts.hook";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/post.service";
import { useInView } from "react-intersection-observer";
import CreatePostModal from "@/components/createPostModal";
import EditPostModal from "@/components/editPostModal";
import PostCard from "@/components/postCard.component";

// interface PostsHookParams {
//   currentPage: number;
//   pageSize: number;
// }

export default function Forum() {
  const { ref, inView } = useInView();
  const { data: session } = useSession();
  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) =>
      getPosts({
        skip: pageParam,
      }),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  function clickModal() {
    setShowCreatePostModal(!showCreatePostModal);
  }

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (!session?.user) {
    return (
      <>
        <div className={`text-center`}>
          <h1>Du er ikke logget inn! Logg inn her:</h1>
          <LoginButton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`text-center content-center m-5 `}>
        <button onClick={clickModal}>
          <BsFillPlusSquareFill
            className={`w-7 h-7  hover:text-slate-500 transition-colors duration-150`}
            title="Create new post!"
          />
        </button>

        {data && (
          <>
            <div id="postsContainer">
              {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.posts.map((post) => {
                    return <PostCard post={post} key={post.id} />;
                  })}
                </React.Fragment>
              ))}
              <div onClick={() => fetchNextPage()} ref={ref}>
                {!hasNextPage && "All posts loaded"}
              </div>
              <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
              </div>
            </div>
            {isFetching && (
              <>
                <div role="status" className={`text-center block m-auto`}>
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin text-center block m-auto  dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            )}
          </>
        )}
        {showCreatePostModal && <CreatePostModal clickModal={clickModal} />}

        <ToastContainer
          position={"top-right"}
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme={"dark"}
        />
      </div>
    </>
  );
}
