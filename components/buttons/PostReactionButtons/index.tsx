"use client";
import { AddLikeAction } from "@/actions/add-like-action";
import DeleteLikeAction from "@/actions/delete-like-action";
import DeleteFavouritePostAction from "@/actions/delete-favourite-post-action";
import { AddFavouritePostAction } from "@/actions/add-favourite-post-action";
import {
  getCommentNumber,
  getPostLikesNumber,
  getPostSoldStatus,
  getUserFavouriteStatus,
  getUserLikeStatus,
} from "@/lib/supabase/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PostReactionButtonPropsType } from "./types";
import CommentButton from "../CommentButton";
import FavouriteButton from "../FavouriteButton";
import LikeButton from "../LikeButton";
import ShareButton from "../ShareButton";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import PostSoldButton from "../PostSoldButton";
import { toast } from "react-toastify";

const PostReactionButtons = ({
  postId,
  onFavouriteDeleteSuccess,
  slug,
  deleteFunction,
  onDeleteSuccess,
  isAuthor,
  postTitle,
  postCategory,
}: PostReactionButtonPropsType) => {
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

  const { data: postIsSold, error: postIsSoldError } = useQuery({
    queryKey: ["post-is-sold", postId],
    queryFn: () => getPostSoldStatus(postId),
  });

  if (postIsSoldError) {
    console.log(postIsSoldError);
  }

  const { mutate } = useMutation({
    mutationFn: ({ postIsLiked }: { postIsLiked: boolean }) => {
      if (postIsLiked) {
        return DeleteLikeAction({ postId });
      } else {
        return AddLikeAction({ postId });
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ["post-likes-count", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["post-is-liked", postId],
      });
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  const {
    mutate: mutatePostFavourite,
    isPending,
  } = useMutation({
    mutationFn: ({ postIsFavourite }: { postIsFavourite: boolean }) => {
      if (postIsFavourite) {
        return DeleteFavouritePostAction({ postId });
      } else {
        return AddFavouritePostAction({ postId });
      }
    },
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      if (postIsFavourite) {
        onFavouriteDeleteSuccess?.();
      }
      queryClient.invalidateQueries({
        queryKey: ["post-is-favourite", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-favourite-count"],
      });
    },
    onError: () => {
      toast.error("Something went wrong. Try again later");
    },
  });

  const commentCount = data?.count ?? 0;
  const likeCount = likesCount?.count ?? 0;

  return (
    <div className="lg:mt-5">
      <ul className="flex lg:gap-2 text-outer-space/50 text-sm justify-evenly flex-wrap">
        <li>
          <LikeButton
            likeCount={likeCount}
            postIsLiked={postIsLiked}
            handleClick={() => mutate({ postIsLiked: !!postIsLiked })}
            disabled={isLoading}
          />
        </li>
        <li>
          <CommentButton commentCount={commentCount} slug={slug} />
        </li>
        <li>
          <ShareButton slug={slug} postTitle={postTitle} />
        </li>
        {isAuthor && (
          <li className="grid place-items-center">
            <EditButton slug={slug} type="icon" />
          </li>
        )}
        {isAuthor && (
          <li className="grid place-items-center">
            <DeleteButton
              id={postId}
              type="icon"
              deleteFunction={deleteFunction}
              onDeleteSuccess={onDeleteSuccess}
            />
          </li>
        )}
        {isAuthor && postCategory === "Marketplace" && (
          <li className="grid place-items-center">
            <PostSoldButton postId={postId} sold={!!postIsSold} />
          </li>
        )}
        <li className="ml-auto">
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