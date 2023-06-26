import { handleCommentDelete } from "@/app/forum/fetchrequests/comments";
import { CommentsHook } from "@/hooks/comments.hook";
import { Comment } from "@/types/forum.types";
import { useState } from "react";

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const { comments, error, loading, mutate } = CommentsHook(postId);
  const [showCommentEditModal, setShowCommentEditModal] =
    useState<boolean>(false);
  const [editText, setEditText] = useState<string>("");
  const [editPostId, setEditPostId] = useState<string>("");

  function clickEditCommentModal(commentId: string, commentBody: string) {
    setEditPostId(commentId);
    setEditText(commentBody);

    setShowCommentEditModal(!showCommentEditModal);
    console.log(editText);
  }
  console.log(comments);
  if (comments === undefined || !comments[0])
    return (
      <h3 className="text-lg font-bold mb-2 pt-3">
        No comments on this post yet!
      </h3>
    );

  function handleCommentEdit() {}

  return (
    comments[0] && (
      <div className="mt-5">
        <h3 className="text-lg font-bold mb-2">Comments</h3>
        <div className="bg-slate-900 p-4 rounded">
          {comments.map((comment: Comment) => {
            var mySqlDate = comment.createdAt.slice(0, 19).replace("T", " ");

            return (
              <div key={comment.id} className="border-t pt-4 mt-4">
                <p className="text-gray-600">{comment.content}</p>
                <div className="flex justify-between items-center text-gray-500 mt-2">
                  <p className="text-sm">{mySqlDate}</p>
                  <p className="text-sm">{comment.user.name}</p>
                </div>
                <div className="mt-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
                    onClick={() => {
                      clickEditCommentModal(comment.id, comment.content);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => {
                      handleCommentDelete(comment.id, comment.user.id);
                      mutate();
                    }}
                  >
                    Delete
                  </button>
                </div>
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
                    clickEditCommentModal("", "");
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
                      await handleCommentEdit();
                      mutate();
                      clickEditCommentModal("", "");
                    }}
                  >
                    <div>
                      <h1>Edit post</h1>
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
    )
  );
}
