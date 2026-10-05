import Link from "next/link";

type ShortPostPropsType = {
  id: string;
  slug: string;
  title: string;
  category: string;
  images: string | null;
  username: string;
  created_at: string;
};

const ShortPost = ({ ...post }: ShortPostPropsType) => {
  return (
    <Link
      className="block border border-apple  bg-ecru-white rounded-2xl p-4 m-4"
      href={`/${post.slug}`}
    >
      <div className="w-full flex justify-between">
        <span>{post.category}</span>
      </div>
      <h3 className="font-bold text-lg">{post.title}</h3>
      <p className="text-right italic">posted by {post.username}</p>
      <p>
        posted on{" "}
        {new Date(post.created_at).toLocaleString("sv-Se", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>
    </Link>
  );
};

export default ShortPost;