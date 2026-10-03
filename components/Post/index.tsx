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
};

const Post = ({
  slug,
  images,
  title,
  content,
  id,
  username,
  isAuthor,
}: PostProps) => {
  return (
    <div className="border-2 border-apple p-8 rounded-2xl">
      {title && <h1 className="heading">{title}</h1>}
      {images && (
        <div>
          <img src={images} alt="" />
        </div>
      )}
      {content && <p>{content}</p>}
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