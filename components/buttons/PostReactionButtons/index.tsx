"use client";
import CommentButton from "../CommentButton";
import FavouriteButton from "../FavouriteButton";
import LikeButton from "../LikeButton";
import ShareButton from "../ShareButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCommentNumber,
  getPostLikesNumber,
  getUserLikeStatus,
} from "@/lib/supabase/queries";
import { AddLikeAction } from "@/actions/add-like-action";
import { DeleteLikeAction } from "@/actions/delete-like-action";

const PostReactionButtons = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["post-comments-count", postId],
    queryFn: () => getCommentNumber(postId),
  });
  if (error) {
    console.log(error);
  }

  const { data: likesCount, error: likesError } = useQuery({
    queryKey: ["post-likes-count", postId],
    queryFn: () => getPostLikesNumber(postId),
  });

  if (likesError) {
    console.log(likesError);
  }

  const {
    data: postIsLiked,
    error: postLikedError,
    isLoading,
  } = useQuery({
    queryKey: ["post-is-liked", postId],
    queryFn: () => getUserLikeStatus(postId),
  });

  if (postLikedError) {
    console.log(postLikedError);
  }

  const { mutate, error: mutateError } = useMutation({
    mutationFn: ({ postIsLiked }: { postIsLiked: boolean }) => {
      if (postIsLiked) {
        return DeleteLikeAction({ postId });
      } else {
        return AddLikeAction({ postId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-likes-count", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-is-liked", postId],
      });
    },
  });

  const commentCount = data?.count ?? 0;
  const likeCount = likesCount?.count ?? 0;

  return (
    <div>
      <ul className="flex gap-4">
        <li>
          <LikeButton
            likeCount={likeCount}
            postIsLiked={postIsLiked}
            handleClick={() => mutate({ postIsLiked: !!postIsLiked })}
            disabled={isLoading}
          />
        </li>
        <li>
          <CommentButton commentCount={commentCount} />
        </li>
        <li>
          <ShareButton />
        </li>
        <li>
          <FavouriteButton />
        </li>
      </ul>
    </div>
  );
};
export default PostReactionButtons;