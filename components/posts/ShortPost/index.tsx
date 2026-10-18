"use client";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import PostCategoryIcons from "@/components/PostCategoryIcon";
import Link from "next/link";
import { ShortPostPropsType } from "./types";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import EditButton from "@/components/buttons/EditButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import { DeletePostAction } from "@/actions/delete-post-action";

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
        {isAuthor && (
          <div className="flex justify-end items-center gap-2">
            <EditButton slug={post.slug} type="icon" />
            <DeleteButton
              id={post.id}
              type="icon"
              deleteFunction={DeletePostAction}
              onDeleteSuccess={onDeleteSuccess}
            />
          </div>
        )}
      </div>
      <Link href={`/post/${post.slug}`} className="cursor-pointer">
        <h3 className="font-bold text-xl hover:text-apple">{post.title}</h3>
        {post.PostImages.length > 0 && (
          <div className="mb-4 flex flex-wrap ">
            <div className="flex justify-start h-40 w-auto">
              {post.PostImages.map((image) => (
                <img
                  key={image.id}
                  src={image.image_url}
                  alt={post.title}
                  className="h-full w-full object-contain bg-no-repeat"
                />
              ))}
            </div>
          </div>
        )}
      </Link>
      <div>
        <PostReactionButtons
          postId={post.id}
          onFavouriteDeleteSuccess={onFavouriteDeleteSuccess}
        />
      </div>
    </div>
  );
};

export default ShortPost;