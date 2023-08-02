import {
  handleCommentDelete,
  handleEdit,
} from "@/app/forum/fetchrequests/comments";
import { CommentsHook } from "@/hooks/comments.hook";
import { Comment } from "@/types/forum/forum.types";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import EditCommentModal from "./editCommentModal.component";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, getComments } from "@/services/post.service";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForumCommentSchemaType,
  forumCommentSchema,
} from "@/app/api/forum/schema";

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [showCommentEditModal, setShowCommentEditModal] =
    useState<boolean>(false);

  const { data, error, isFetching, status } = useQuery({
    queryKey: [postId],
    queryFn: () =>
      getComments({
        postId: postId,
      }),
  });

  console.log(data);
  function clickEditCommentModal() {
    setShowCommentEditModal(!showCommentEditModal);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForumCommentSchemaType>({
    resolver: zodResolver(forumCommentSchema),
    defaultValues: {
      postId: postId,
    },
  });
  const mutation = useMutation({
    mutationFn: (postData: ForumCommentSchemaType) => {
      return createComment(postData);
    },
  });

  const onSubmit: SubmitHandler<ForumCommentSchemaType> = async (data) => {
    await mutation.mutateAsync(data);
    queryClient.invalidateQueries([postId]);
  };

  if (isFetching)
    return (
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
    );
  if (data === undefined || !Array.isArray(data))
    return (
      <>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-4/5 border border-gray-300 rounded-full m-2 p-2 text-black"
              placeholder="Add a comment"
              {...register("postBody")}
            />
            {errors.postBody && (
              <span className="text-white block mt-2 bg-red-600 rounded-md p-2 ring-2 ring-red-700 ring-opacity-25">
                {errors.postBody?.message}
              </span>
            )}
            <button
              className="rounded-full bg-gray-700 p-2 inline-flex items-center justify-center"
              type="submit"
            >
              add comment
            </button>
          </form>
        </div>
        <h3 className="text-lg font-bold mb-2 pt-3">
          No comments on this post yet!
        </h3>
      </>
    );

  return (
    <>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="w-4/5 border border-gray-300 rounded-full m-2 p-2 text-black"
            placeholder="Add a comment"
            {...register("postBody")}
          />
          {errors.postBody && (
            <span className="text-white block mt-2 bg-red-600 rounded-md p-2 ring-2 ring-red-700 ring-opacity-25">
              {errors.postBody?.message}
            </span>
          )}
          <button
            className="rounded-full bg-gray-700 p-2 inline-flex items-center justify-center"
            type="submit"
          >
            add comment
          </button>
        </form>
      </div>
      {data && (
        <div className="mt-5">
          <h3 className="text-lg font-bold mb-2">Comments</h3>
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
          <div className="bg-slate-900 p-4 rounded">
            {Array.isArray(data) &&
              data.map((comment: Comment) => {
                var mySqlDate = comment.createdAt
                  .slice(0, 19)
                  .replace("T", " ");
                let createdComment = false;
                if (
                  //@ts-ignore
                  comment.user.id === session.user?.id ||
                  //@ts-ignore
                  session.user?.whitelisted === true
                )
                  createdComment = true;
                return (
                  <div key={comment.id} className="border-t pt-4 mt-4">
                    <p className="text-gray-600">{comment.content}</p>
                    <div className="flex justify-between items-center text-gray-500 mt-2">
                      <p className="text-sm">{mySqlDate}</p>
                      <p className="text-sm">{comment.user.name}</p>
                    </div>
                    {createdComment && (
                      <div className="mt-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
                          onClick={async () => {
                            clickEditCommentModal();
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded-md"
                          onClick={async () => {
                            await handleCommentDelete(
                              comment.id,
                              comment.user.id,
                            );
                            queryClient.invalidateQueries([postId]);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {showCommentEditModal && (
                      <EditCommentModal
                        clickEditCommentModal={clickEditCommentModal}
                        commentId={comment.id}
                        commentPosterId={comment.user.id}
                        postId={postId}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
