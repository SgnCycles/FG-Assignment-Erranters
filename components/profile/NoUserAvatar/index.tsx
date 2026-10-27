import PostCategoryIcons from "@/components/PostCategoryIcon";
import { PostType } from "@/lib/supabase/queries";

const NoUserAvatar = ({ post }: { post: PostType }) => {
  return (
    <div className="flex gap-2 text-right place-self-center">
      <span className="font-semibold">{post.author.username}</span>
      <span className="text-[10px] place-self-center">
        {new Date(post.created_at).toLocaleString("sv-Se", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </span>
      <PostCategoryIcons category={post.category} />
    </div>
  );
};

export default NoUserAvatar;