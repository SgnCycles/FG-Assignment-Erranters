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
          <div key={comment.id}>
            <p>{comment.content}</p>
            <p>by {comment.author.username}</p>
            <p>{comment.created_at}</p>
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