"use client";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/EditButton";
import { DeletePostAction } from "@/actions/delete-post-action";
import PostComments from "@/components/comments/PostComments";
import AddCommentForm from "@/components/forms/AddCommentForm";
import PostCategoryIcons from "@/components/PostCategoryIcon";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import { PostPropsType } from "./types";

const Post = ({ post, isAuthor, userId }: PostPropsType) => {
  const router = useRouter();
  const onDeleteSuccess = () => {
    router.push("/feed");
  };

  return (
    <div className="flex flex-col h-full items-center p-8 rounded-2xl grow bg-mineral-green text-ecru-white font-cantarell">
      <div className="bg-casual-white text-outer-space rounded-4xl w-2/3 p-10">
        <div className="flex justify-between mb-4">
          {post.title && (
            <h1 className="post-heading text-outer-space">{post.title}</h1>
          )}
          <div className="flex">
            {isAuthor && (
              <div className="flex justify-end gap-2">
                <UpdateButton slug={post.slug} type="icon" />
                <DeleteButton
                  id={post.id}
                  type="icon"
                  deleteFunction={DeletePostAction}
                  onDeleteSuccess={onDeleteSuccess}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-between mb-4">
          <div className="flex">
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
            <div className="flex gap-2 text-right italic place-self-center ml-2">
              <span>{post.author.username}</span>
              <span>
                {new Date(post.created_at).toLocaleString("sv-Se", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              <PostCategoryIcons category={post.category} />
            </div>
          </div>
        </div>
        <div className="mb-4">
          {post.PostImages.length === 0 && null}
          {post.PostImages.length > 0 && (
            <div className="flex justify-start">
              {post.PostImages.map((image) => (
                <img
                  key={image.id}
                  src={image.image_url}
                  alt={post.title}
                  className="h-50 w-auto"
                />
              ))}
            </div>
          )}
        </div>
        {post.content && (
          <div className="text-base">
            <p>{post.content}</p>
          </div>
        )}
        <PostReactionButtons postId={post.id} />
        <div className="my-4">
          {userId && <AddCommentForm postId={post.id} slug={post.slug} />}
          <PostComments postId={post.id} isAuthor={isAuthor} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Post;
