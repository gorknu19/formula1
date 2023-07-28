import { handleDelete } from "@/app/forum/fetchrequests/posts";
import Comments from "./comments";
import EditPostModal from "./editPostModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Post } from "@/services/post.service";

const intlDate = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

interface PostCardParams {
  post: Post;
}

const PostCard = ({ post }: PostCardParams) => {
  const { data: session } = useSession();

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  function clickEditModal() {
    setShowEditModal(!showEditModal);
  }

  var mySqlDate = intlDate.format(new Date(post.createdAt));
  let createdPost = false;
  if (
    //@ts-ignore
    post.user.id === session.user?.id ||
    //@ts-ignore
    session.user?.whitelisted === true
  )
    createdPost = true;
  return (
    <div
      className=" w-3/4 mx-auto bg-slate-800 rounded shadow-md p-4 m-10"
      key={post.id}
      id={post.id}
    >
      <h2 className="text-xl font-bold mb-2 whitespace-normal">{post.title}</h2>
      <p className="text-gray-300 mb-4 whitespace-normal ">{post.content}</p>
      <div className="flex justify-between items-center text-white mt-10">
        <p className="text-sm">{mySqlDate}</p>
        <p className="text-sm">{post.user.name}</p>
      </div>
      {createdPost && (
        <div className="mt-4 flex justify-end" id={post.user.id}>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
            onClick={() => {
              clickEditModal();
            }}
            id={post.id}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded-md"
            onClick={async () => {
              await handleDelete(post.id, post.user.id);
            }}
          >
            Delete
          </button>
        </div>
      )}
      <Comments postId={post.id} />
      {showEditModal && (
        <EditPostModal clickEditModal={clickEditModal} postId={post.id} />
      )}
    </div>
  );
};

export default PostCard;
