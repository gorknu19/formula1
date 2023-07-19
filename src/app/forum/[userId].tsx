import { PostsHook } from "@/hooks/posts.hook";
import { useSearchParams } from "next/navigation";
// how do i type a dynamic route in next.js?

const ProfilePosts = () => {
  const params = useSearchParams();
  const id = params?.get("id");
  console.log(id);
  if (!id) {
    return <h1>Not a valid user</h1>;
  }
  const {
    allPosts,
    error,
    loading,
    mutate,
    nextPage,
    prevPage,
    maxPage,
    currentPage,
  } = PostsHook(id);
  return (
    <div>
      <div className="w-1/2 top-0 p-2">{id}</div>
    </div>
  );
};

export default ProfilePosts;
