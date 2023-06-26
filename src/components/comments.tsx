import { CommentsHook } from "@/hooks/comments.hook";
import { Comment } from "@/types/forum.types";

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const { comments, error, loading, mutate } = CommentsHook(postId);
  function handleEditComment(id: string): void {
    throw new Error("Function not implemented.");
  }
  function handleDeleteComment(id: string): void {
    throw new Error("Function not implemented.");
  }

  if (!comments)
    return (
      <h3 className="text-lg font-bold mb-2 pt-3">
        No comments on this post yet!
      </h3>
    );

  return (
    comments && (
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
                    onClick={() => handleEditComment(comment.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}
