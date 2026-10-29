const FavouriteButton = ({
  postIsFavourite,
  handleClick,
  disabled,
}: {
  postIsFavourite: boolean | undefined;
  handleClick: () => void;
  disabled: boolean;
}) => {
  return (
    <button
      className="postReactionButton"
      onClick={handleClick}
      disabled={disabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={postIsFavourite ? "#65ab32" : "none"}
        stroke={postIsFavourite ? "#65ab32" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-star preview-icon"
      >
        <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
      </svg>
      {/* TO DO: add tool tip "Favourite here" */}
    </button>
  );
};

export default FavouriteButton;