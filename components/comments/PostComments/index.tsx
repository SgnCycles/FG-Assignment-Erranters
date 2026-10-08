"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostComments } from "@/lib/supabase/queries";
import DeleteButton from "../../buttons/DeleteButton";
import DeleteCommentAction from "@/actions/delete-comment-action";

type PostCommentsPropsType = {
  postId: string;
  isAuthor: boolean;
  userId: string | null;
};

const PostComments = ({ postId, isAuthor, userId }: PostCommentsPropsType) => {
  const queryClient = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: () => getPostComments(postId),
  });
  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["post-comments", postId],
    });
  };

  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="flex justify-between">
            <div>
              <div className="flex gap-4 text-[14px]">
                <p>by {comment.author.username}</p>
                <p>
                  {new Date(comment.created_at).toLocaleString("sv-Se", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}{" "}
                </p>
              </div>
              <div className="text-base">
                <p>{comment.content}</p>
              </div>
            </div>

            {(isAuthor || userId === comment.author.id) && (
              <DeleteButton
                id={comment.id}
                type="text"
                deleteFunction={DeleteCommentAction}
                onDeleteSuccess={onDeleteSuccess}
              />
            )}
          </div>
        ))
      ) : (
        <h2>Be the first to comment...</h2>
      )}
    </div>
  );
};

export default PostComments;