import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import PostCategoryIcons from "@/components/PostCategoryIcon";
import Link from "next/link";

type ShortPostPropsType = {
  id: string;
  slug: string;
  title: string;
  category: string;
  username: string;
  userImage: string | null;
  created_at: string;
  PostImages: {
    id: string;
    image_url: string;
    position: number;
  }[];
};

const ShortPost = ({ ...post }: ShortPostPropsType) => {
  return (
    <div className="flex flex-col justify-around gap-4 border border-apple bg-ecru-white rounded-2xl p-4 m-4 text-outer-space">
      <div className="w-full flex justify-between">
        <Link
          href={`/members/${post.username}`}
          className="flex cursor-pointer"
        >
          <div>
            {post.userImage ? (
              <img
                src={post.userImage}
                alt="profile user"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="h-full w-full bg-gray-600"></div>
            )}
          </div>
          <div className="flex gap-2 text-right italic place-self-center ml-2">
            <span>{post.username}</span>
            <span className="place-self-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-asterisk preview-icon"
              >
                <path d="M12 5v14" />
                <path d="m18.065 8.496-12.125 7" />
                <path d="m5.94 8.504 12.125 7" />
              </svg>
            </span>
            <span className="text-[10px] place-self-center">
              {new Date(post.created_at).toLocaleString("sv-Se", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
          </div>
        </Link>
        <PostCategoryIcons category={post.category} />
      </div>
      <Link href={`/post/${post.slug}`} className="cursor-pointer">
        <h3 className="font-bold text-lg">{post.title}</h3>
        <div className="mb-4">
          <div className="flex justify-start">
            {post.PostImages.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt={post.title}
                className="h-50 w-auto"
              />
            ))}
          </div>
        </div>
      </Link>
      <div>
        <PostReactionButtons />
      </div>
    </div>
  );
};

export default ShortPost;
