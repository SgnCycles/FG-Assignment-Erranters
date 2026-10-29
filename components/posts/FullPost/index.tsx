"use client";
import DeletePostAction from "@/actions/delete-post-action";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import type { userContextType } from "@/types/types";
import type { PostType } from "@/lib/supabase/queries";
import AddCommentForm from "@/components/forms/AddCommentForm";
import ImageGallery from "@/components/ImageGallery";
import PostComments from "@/components/comments/PostComments";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import UserAvatar from "@/components/profile/UserAvatar";

const Post = ({ post }: { post: PostType }) => {

  const router = useRouter();
  const { user, isLoading } = useUserContext() as userContextType;
  const userId = user?.id;
  const isAuthor: boolean =
    user && post && userId! === post.author.id ? true : false;

  const onDeleteSuccess = () => {
    router.push("/feed");
  };

  if (isLoading) return <p className="info-heading">Loading...</p>;
  if (!user) return <p className="info-heading">Unauthorized Access!</p>;

  return (
    <div className="post-main-layout">
      <div className="post-content-layout">
        <div className="flex justify-between mb-4">
          {post.title && (
            <h1 className="post-heading text-outer-space pr-4">{post.title}</h1>
          )}
          {post.sold && <div className="sold-label">SOLD</div>}
        </div>
        <UserAvatar post={post} />
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
              <p className="font-semibold">
                Price:{" "}
                <span className="font-normal">
                  {post.price} {post.currency}
                </span>
              </p>
            </div>
          )}
          {post.location && (
            <div className="text-base">
              <p className="font-semibold">
                Location: <span className="font-normal">{post.location}</span>
              </p>
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
          postCategory={post.category}
        />
        <div className="my-4">
          {userId && <AddCommentForm postId={post.id} slug={post.slug} />}
          <hr className="w-full border-outer-space/20 border-t-[0.5px] px-4 mb-4 mt-10"></hr>
          <PostComments
            postId={post.id}
            isAuthor={isAuthor}
            userId={user.id}
            slug={post.slug}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;