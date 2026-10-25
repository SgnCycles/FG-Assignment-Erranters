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
      toast.success("Item marked");
      queryClient.invalidateQueries({
        queryKey: ["post-is-sold", postId],
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
      />
      <label htmlFor={`sold-${postId}`}>Sold</label>
    </div>
  );
};

export default PostSoldButton;