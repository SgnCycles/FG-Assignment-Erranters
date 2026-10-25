"use client";
import { useRouter } from "next/navigation";
import { DeletePostAction } from "@/actions/delete-post-action";
import PostComments from "@/components/comments/PostComments";
import AddCommentForm from "@/components/forms/AddCommentForm";
import PostCategoryIcons from "@/components/PostCategoryIcon";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import { PostPropsType } from "./types";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

const Post = ({ post, isAuthor, userId }: PostPropsType) => {
  const router = useRouter();
  const onDeleteSuccess = () => {
    router.push("/feed");
  };

  return (
    <div className="w-full flex h-full justify-center items-center p-8 text-ecru-white font-cantarell">
      <div className="bg-casual-white text-outer-space rounded-4xl p-10 w-[80%]">
        <div className="flex justify-between mb-4">
          {post.title && (
            <h1 className="post-heading text-outer-space">{post.title}</h1>
          )}
        </div>
        {/* testing */}
        <div>
          {post.category === "Marketplace" && post.sold
            ? "Post is sold"
            : "Post is not sold"}
        </div>
        <Link
          className="w-full flex justify-between mb-4"
          href={`/members/${post.author.username}`}
        >
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
        </Link>
        <div className="mb-4">
          {post.PostImages.length === 0 && null}
          {post.PostImages && post.PostImages.length > 0 && (
            <ImageGallery postImages={post.PostImages} post_type="long" />
          )}
        </div>
        {post.content && (
          <div className="text-base">
            <p>{post.content}</p>
          </div>
        )}
        <div className="mt-10">
          {post.price && (
            <div className="text-base">
              <p>Price: {post.price}</p>
            </div>
          )}
          {post.location && (
            <div className="text-base">
              <p>Location: {post.location}</p>
            </div>
          )}
        </div>
        <PostReactionButtons
          postId={post.id}
          slug={post.slug}
          deleteFunction={DeletePostAction}
          onDeleteSuccess={onDeleteSuccess}
          isAuthor={isAuthor}
          postTitle={post.title}
        />
        <div className="my-4">
          {userId && <AddCommentForm postId={post.id} slug={post.slug} />}
          <hr className="w-full border-outer-space/50 border-t-[0.5px] px-4 mb-4 mt-10"></hr>
          <PostComments
            postId={post.id}
            isAuthor={isAuthor}
            userId={userId}
            slug={post.slug}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
