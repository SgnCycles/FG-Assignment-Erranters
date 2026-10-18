"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostComments } from "@/lib/supabase/queries";
import SortingButton from "@/components/buttons/SortingButton";
import { useState } from "react";
import { PostCommentsPropsType } from "./types";
import Comment from "../Comment";

const PostComments = ({ postId, isAuthor, userId }: PostCommentsPropsType) => {

  const [sortingOrder, setSortingOrder] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: ["post-comments", postId, sortingOrder],
    queryFn: () => getPostComments(postId, sortingOrder),
  });
  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["post-comments", postId],
    });
  };

  return (
    <div className="mt-4">
      <SortingButton
        type="dark"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} isAuthor={isAuthor} userId={userId} onDeleteSuccess={onDeleteSuccess}/>
        ))
      ) : (
        <h2>Be the first to comment...</h2>
      )}
    </div>
  );
};

export default PostComments;