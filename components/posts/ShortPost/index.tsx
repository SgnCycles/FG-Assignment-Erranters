"use client";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import PostCategoryIcons from "@/components/PostCategoryIcon";
import Link from "next/link";
import { ShortPostPropsType } from "./types";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { DeletePostAction } from "@/actions/delete-post-action";
import ImageGallery from "@/components/ImageGallery";

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
    <div className="flex flex-col justify-around gap-4 border-2 border-casual-white bg-casual-white rounded-2xl p-4 m-4 text-outer-space">
      <div className="w-full flex justify-between">
        {showUser ? (
          <Link
            href={`/members/${post.author.username}`}
            className="flex cursor-pointer"
          >
            <div>
              {post.author.profile_image ? (
                <img
                  src={post.author.profile_image}
                  alt="profile user"
                  className="w-15 h-15 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 relative rounded-full">
                  <img
                    src="/images/profileImage_placeholder.png"
                    alt="user placeholder"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 text-right place-self-center ml-2">
              <span className="font-semibold">{post.author.username}</span>
              <span className="text-[10px] place-self-center">
                {new Date(post.created_at).toLocaleString("sv-Se", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              <PostCategoryIcons category={post.category} />
            </div>
          </Link>
        ) : (
          <div className="flex gap-2 text-right place-self-center">
            <span className="font-semibold">{post.author.username}</span>
            <span className="text-[10px] place-self-center">
              {new Date(post.created_at).toLocaleString("sv-Se", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
            <PostCategoryIcons category={post.category} />
          </div>
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
        />
      </div>
    </div>
  );
};

export default ShortPost;