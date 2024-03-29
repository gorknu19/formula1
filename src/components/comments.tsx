import {
  createComment,
  handleCommentDelete,
  handleEdit,
} from "@/app/forum/fetchrequests/comments";
import { CommentsHook } from "@/hooks/comments.hook";
import { Comment } from "@/types/forum/forum.types";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const { data: session } = useSession();
  const { comments, error, loading, mutate } = CommentsHook(postId);
  const [showCommentEditModal, setShowCommentEditModal] =
    useState<boolean>(false);
  const [editText, setEditText] = useState<string>("");
  const [editPostId, setEditPostId] = useState<string>("");
  const [commentUserId, setCommentUserId] = useState<string>("");

  function clickEditCommentModal(
    commentId: string,
    commentBody: string,
    commentPosterId: string,
  ) {
    setEditPostId(commentId);
    setEditText(commentBody);
    setCommentUserId(commentPosterId);

    setShowCommentEditModal(!showCommentEditModal);
  }
  if (comments === undefined || !comments[0])
    return (
      <>
        <div className="mt-4">
          <input
            type="text"
            className="w-4/5 border border-gray-300 rounded-full m-2 p-2 text-black"
            placeholder="Add a comment"
          />
          <button
            className="rounded-full bg-gray-700 p-2 inline-flex items-center justify-center"
            onClick={async (req) => {
              await createComment(req);
              mutate();
            }}
          >
            add comment
          </button>
        </div>
        <h3 className="text-lg font-bold mb-2 pt-3">
          No comments on this post yet!
        </h3>
      </>
    );

  return (
    <>
      <div className="mt-4">
        <input
          type="text"
          className="w-4/5 border border-gray-300 rounded-full m-2 p-2 text-black"
          placeholder="Add a comment"
        />
        <button
          className="rounded-full bg-gray-700 p-2 inline-flex items-center justify-center"
          onClick={async (req) => {
            await createComment(req);
            mutate();
          }}
        >
          add comment
        </button>
      </div>
      {comments[0] && (
        <div className="mt-5">
          <h3 className="text-lg font-bold mb-2">Comments</h3>
          {loading && (
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
            {comments.map((comment: Comment) => {
              var mySqlDate = comment.createdAt.slice(0, 19).replace("T", " ");
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
                        onClick={() => {
                          clickEditCommentModal(
                            comment.id,
                            comment.content,
                            comment.user.id,
                          );
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
                          mutate();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {showCommentEditModal && (
            <div className="fixed w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full text-center m-auto">
              <div className="relative w-full max-w-md max-h-full m-auto">
                <div className="bg-slate-500 rounded-lg shadow dark:bg-gray-700  border border-black ">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                    onClick={() => {
                      clickEditCommentModal("", "", "");
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="px-6 py-6 lg:px-8">
                    <form
                      className="space-y-6"
                      onSubmit={async () => {
                        await handleEdit(editText, editPostId, commentUserId);
                        mutate();
                        clickEditCommentModal("", "", "");
                      }}
                    >
                      <div>
                        <h1>Edit Comment</h1>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-white">
                          Content
                        </label>
                        <textarea
                          name="content"
                          id="content"
                          placeholder="text"
                          className="bg-slate-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-slate-700 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Edit comment
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
