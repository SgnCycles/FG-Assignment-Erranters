"use client";
import CommentButton from "../CommentButton";
import FavouriteButton from "../FavouriteButton";
import LikeButton from "../LikeButton";
import ShareButton from "../ShareButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCommentNumber,
  getPostLikesNumber,
  getUserFavouriteStatus,
  getUserLikeStatus,
} from "@/lib/supabase/queries";
import { AddLikeAction } from "@/actions/add-like-action";
import { DeleteLikeAction } from "@/actions/delete-like-action";
import { DeleteFavouritePostAction } from "@/actions/delete-favourite-post-action";
import { AddFavouritePostAction } from "@/actions/add-favourite-post-action";

const PostReactionButtons = ({
  postId,
  onFavouriteDeleteSuccess,
}: {
  postId: string;
  onFavouriteDeleteSuccess: () => void;
}) => {
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

  const {
    data: postIsFavourite,
    error: postIsFavouriteError,
    isLoading: postIsFavouriteLoading,
  } = useQuery({
    queryKey: ["post-is-favourite", postId],
    queryFn: () => getUserFavouriteStatus(postId),
  });

  if (postIsFavouriteError) {
    console.log(postIsFavouriteError);
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

  const {
    mutate: mutatePostFavourite,
    error: postFavouriteError,
    isPending,
  } = useMutation({
    mutationFn: ({ postIsFavourite }: { postIsFavourite: boolean }) => {
      if (postIsFavourite) {
        return DeleteFavouritePostAction({ postId });
      } else {
        return AddFavouritePostAction({ postId });
      }
    },
    onSuccess: () => {
      if (postIsFavourite) {
        onFavouriteDeleteSuccess();
      }
      queryClient.invalidateQueries({
        queryKey: ["post-is-favourite", postId],
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
          <FavouriteButton
            postIsFavourite={postIsFavourite}
            handleClick={() =>
              mutatePostFavourite({ postIsFavourite: !!postIsFavourite })
            }
            disabled={postIsFavouriteLoading || isPending}
          />
        </li>
      </ul>
    </div>
  );
};
export default PostReactionButtons;