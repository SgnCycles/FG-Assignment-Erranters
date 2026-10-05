import Link from "next/link";
import EditButton from "../../buttons/EditButton";
import DeleteButton from "../../buttons/DeleteButton";

type MyPostPropsType = {
  id: string;
  slug: string;
  title: string;
  category: string;
  images: string | null;
  username: string;
  created_at: string;
};

const MyPost = ({ ...post }: MyPostPropsType) => {
  return (
    <div className="block border border-apple  bg-ecru-white rounded-2xl p-4 m-4">
      <div>
        <div className="flex justify-end">
          <EditButton slug={post.slug} type="icon" />
          <DeleteButton id={post.id} type="icon" />
        </div>
        <Link
          
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
      </div>
    </div>
  );
};

export default MyPost;