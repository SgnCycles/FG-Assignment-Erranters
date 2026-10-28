"use client";
import DeletePostAction from "@/actions/delete-post-action";
import type { ShortPostPropsType } from "./types";
import type { userContextType } from "@/types/types";
import { useUserContext } from "@/context/userContext";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import UserAvatar from "@/components/profile/UserAvatar";
import NoUserAvatar from "@/components/profile/NoUserAvatar";

const ShortPost = ({
  onFavouriteDeleteSuccess,
  post,
  showUser,
}: ShortPostPropsType) => {
  const { user } = useUserContext() as userContextType;
  const isAuthor = user?.id === post.author?.id;
  const queryClient = useQueryClient();

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["my-posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["home-posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["my-favourite-posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["user-post-count"],
    });
  };

  return (
    <div className="flex flex-col justify-around gap-4 border-2 border-casual-white bg-casual-white rounded-2xl p-4 my-4 text-outer-space">
      <div className="w-full flex justify-between">
        {showUser ? (
          <UserAvatar post={post} />
        ) : (
          <NoUserAvatar post={post}/>
        )}
        {post.sold && <div className="sold-label">SOLD</div>}
      </div>
      <Link href={`/post/${post.slug}`} className="cursor-pointer">
        <h3 className="font-bold text-xl hover:text-apple">{post.title}</h3>
      </Link>
      {post.PostImages && post.PostImages.length > 0 && (
        <ImageGallery postImages={post.PostImages} post_type="short" />
      )}
      <div>
        <PostReactionButtons
          postId={post.id}
          onFavouriteDeleteSuccess={onFavouriteDeleteSuccess}
          slug={post.slug}
          deleteFunction={DeletePostAction}
          onDeleteSuccess={onDeleteSuccess}
          isAuthor={isAuthor}
          postTitle={post.title}
          postCategory={post.category}
        />
      </div>
    </div>
  );
};

export default ShortPost;