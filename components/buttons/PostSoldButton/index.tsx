import { MarkPostSoldAction } from "@/actions/mark-post-sold-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const PostSoldButton = ({
  postId,
  sold,
}: {
  postId: string;
  sold: boolean;
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: MarkPostSoldAction,
    onSuccess: () => {
      if (sold === true) {
        toast.warning("Item marked as not sold");
      } else {
        toast.success("Item marked as sold");
      }
      queryClient.invalidateQueries({
        queryKey: ["post-is-sold", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["home-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-favourite-posts"],
      });
    },
    onError: () => toast.error("Something went wrong!"),
  });

  return (
    <div className="postReactionButton group">
      <input
        type="checkbox"
        id={`sold-${postId}`}
        checked={sold}
        onChange={(e) => mutate({ postId, sold: e.target.checked })}
        className="cursor-pointer accent-old-gold"
      />
      <label htmlFor={`sold-${postId}`}>Sold</label>
    </div>
  );
};

export default PostSoldButton;