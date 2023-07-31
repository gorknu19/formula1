import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForumCommentEditSchemaType,
  forumCommentEditSchema,
} from "@/app/api/forum/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment, editPost } from "@/services/post.service";

interface EditCommentParams {
  clickEditCommentModal: () => void;
  commentId: string;
  commentPosterId: string;
}

const EditCommentModal = ({
  clickEditCommentModal,
  commentId,
  commentPosterId,
}: EditCommentParams) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForumCommentEditSchemaType>({
    resolver: zodResolver(forumCommentEditSchema),
    defaultValues: {
      CommentId: commentId,
      commentPosterId: commentPosterId,
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (postData: ForumCommentEditSchemaType) => {
      console.log("henlo");
      return editComment({
        postData: {
          ...postData,
        },
      });
    },
  });

  const onSubmit: SubmitHandler<ForumCommentEditSchemaType> = async (data) => {
    console.log("mongo");
    await mutation.mutateAsync(data);
    queryClient.invalidateQueries(["posts"]);
    clickEditCommentModal();
  };
  console.log(errors);
  return (
    <div className="fixed w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full text-center m-auto">
      <div className="relative w-full max-w-md max-h-full m-auto">
        <div className="bg-slate-500 rounded-lg shadow dark:bg-gray-700  border border-black ">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => {
              clickEditCommentModal();
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
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h1>Edit comment!</h1>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Content
                </label>
                <textarea
                  id="content"
                  placeholder="text"
                  className="bg-slate-600 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  {...register("postBody")}
                />
                {errors.postBody && (
                  <span className="text-white block mt-2 bg-red-600 rounded-md p-2 ring-2 ring-red-700 ring-opacity-25  ">
                    {errors.postBody?.message}
                  </span>
                )}
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
  );
};

export default EditCommentModal;
