import { useSearchParams } from "next/navigation";
// how do i type a dynamic route in next.js?

const ProfilePosts = () => {
  const params = useSearchParams();
  const id = params?.get("id");
  return (
    <div>
      <div className="w-1/2 top-0 p-2">{id}</div>
    </div>
  );
};

export default ProfilePosts;
