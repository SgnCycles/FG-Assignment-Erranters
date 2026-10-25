import { toast } from "react-toastify";

const ShareButton = ({
  slug,
  postTitle,
}: {
  slug: string;
  postTitle: string;
}) => {

  const sharePost = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: `${window.location.origin}/post/${slug}`,
          title: postTitle,
        });
        toast.success("Post shared!")
      } else {
        await navigator.clipboard.writeText(
          `${window.location.origin}/post/${slug}`,
        );
        toast.success("Link copied!")
      }
    } catch (error){
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.log("Failed to share the post:", error)
    }
  };

  return (
    <button className="postReactionButton group" onClick={sharePost}>
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
        className="lucide lucide-forward preview-icon hover:stroke-apple"
      >
        <path d="m15 17 5-5-5-5" />
        <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
      </svg>
      Share
    </button>
  );
};

export default ShareButton;