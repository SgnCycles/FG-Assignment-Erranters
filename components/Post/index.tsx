import Link from "next/link";
import DeleteButton from "../DeleteButton";

type PostProps = {
  id: string;
  slug: string;
  title: string;
  content: string;
  images: string | null;
  username: string;
  isAuthor: boolean;
  created_at: string;
};

const Post = ({
  slug,
  images,
  title,
  content,
  id,
  username,
  isAuthor,
  created_at,
}: PostProps) => {
  return (
    <div className="flex flex-col border-2 border-apple p-8 rounded-2xl grow bg-blue-400">
      {title && <h1 className="heading">{title}</h1>}
      {!images && <p>No Images for this post</p>}
      {images && (
        <div>
          <img src={images} alt="" />
        </div>
      )}
      {content && <p>{content}</p>}
      <p className="mt-8">
        published:{" "}
        {new Date(created_at).toLocaleString("sv-Se", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>
      <p className="mt-8">created by {username}</p>
      {isAuthor && (
        <div className="mt-4 flex justify-end">
          <Link className="button" href={`/${slug}/edit`}>
            Update
          </Link>
          <DeleteButton id={id} />
        </div>
      )}
    </div>
  );
};

export default Post;