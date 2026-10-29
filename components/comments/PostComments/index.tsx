"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentNumber, getPostComments } from "@/lib/supabase/queries";
import { useState } from "react";
import type { PostCommentsPropsType } from "./types";
import Comment from "../Comment";
import SortingButton from "@/components/buttons/SortingButton";

const PostComments = ({
  postId,
  isAuthor,
  userId,
  slug,
}: PostCommentsPropsType) => {

  const [sortingOrder, setSortingOrder] = useState<boolean>(true);
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
  const parentComments = comments?.filter(
    (comment) => comment.parent_id === null,
  );

  return (
    <div className="mt-4">
      <p className="comment-form-heading-h2">{commentCount} comments</p>
      <SortingButton
        type="dark"
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
      />
      {parentComments && parentComments.length > 0 ? (
        parentComments.map((parent) => (
          <ul key={parent.id}>
            <li className="comment-list">
              <Comment
                comment={parent}
                isAuthor={isAuthor}
                userId={userId}
                onDeleteSuccess={onDeleteSuccess}
                postId={postId}
                slug={slug}
              />
              <ul className="comment-replies">
                {comments
                  ?.filter((child) => child.parent_id === parent.id)
                  .map((child) => (
                    <li key={child.id} className="comment-reply">
                      <Comment
                        comment={child}
                        isAuthor={isAuthor}
                        userId={userId}
                        onDeleteSuccess={onDeleteSuccess}
                        postId={postId}
                        slug={slug}
                      />
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        ))
      ) : (
        <h2>Be the first to comment...</h2>
      )}
    </div>
  );
};

export default PostComments;