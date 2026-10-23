"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentNumber, getPostComments } from "@/lib/supabase/queries";
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

    const { data: commentAmount, error } = useQuery({
      queryKey: ["post-comments-count", postId],
      queryFn: () => getCommentNumber(postId),
    });
    if (error) {
      console.log(error);
    }
    
  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["post-comments", postId],
    });
  };

  const commentCount = commentAmount?.count ?? 0;

  return (
    <div className="mt-4">
      <p className="font-semibold text-sm">{commentCount} comments</p>
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