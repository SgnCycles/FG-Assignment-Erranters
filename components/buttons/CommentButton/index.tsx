import Link from "next/link";

const CommentButton = ({
  commentCount,
  slug,
}: {
  commentCount: number;
  slug: string;
}) => {
  return (
    <Link className="postReactionButton group" href={`/post/${slug}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-circle preview-icon group-hover:stroke-apple"
      >
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
      </svg>
      {commentCount}
    </Link>
  );
};

export default CommentButton;