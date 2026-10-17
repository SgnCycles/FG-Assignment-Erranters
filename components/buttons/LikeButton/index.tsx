const LikeButton = ({
  likeCount,
  postIsLiked,
  handleClick,
  disabled,
}: {
  likeCount: number;
  postIsLiked: boolean | undefined;
  handleClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className="postReactionButtons"
      onClick={handleClick}
      disabled={disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={postIsLiked ? "#919795" : "none"}
        stroke={postIsLiked ? "#919795" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-heart preview-icon"
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
      </svg>
      {likeCount}
    </button>
  );
};

export default LikeButton;