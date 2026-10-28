import PostCategoryIcons from "@/components/PostCategoryIcon";
import { PostType } from "@/lib/supabase/queries";
import Link from "next/link";

const UserAvatar = ({ post }: { post: PostType }) => {
  return (
    <Link
      className="w-full flex justify-between mb-4"
      href={`/members/${post.author.username}`}
    >
      <div className="flex flex-row">
        {post.author.profile_image ? (
          <div className="w-15 h-15">
            <img
              src={post.author.profile_image}
              alt="profile user"
              className="w-full h-full rounded-full"
            />
          </div>
        ) : (
          <div className="h-10 w-10 relative rounded-full">
            <img
              src="/images/profileImage_placeholder.png"
              alt="user placeholder"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-2 items-start text-right italic ml-4 lg:ml-2 mt-2">
          <span>{post.author.username}</span>
          <div className="flex items-start">
            <span className="pr-2 text-nowrap">
              {new Date(post.created_at).toLocaleString("sv-Se", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
            <PostCategoryIcons category={post.category} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserAvatar;
