"use client";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/EditButton";
import { DeletePostAction } from "@/actions/delete-post-action";
import PostComments from "@/components/comments/PostComments";
import AddCommentForm from "@/components/forms/AddCommentForm";
import PostCategoryIcons from "@/components/PostCategoryIcon";
import { PostPropsType } from "./types";

const Post = ({ ...data }: PostPropsType) => {
  const router = useRouter();
  const onDeleteSuccess = () => {
    router.push("/feed");
  };

  return (
    <div className="flex flex-col h-full justify-between p-8 rounded-2xl grow bg-mineral-green text-ecru-white">
      <div className="flex flex-col mb-4">
        {data.title && <h1 className="heading">{data.title}</h1>}
      </div>
      <div className="w-full flex justify-between">
        <div className="flex">
          {data.userImage ? (
            <img
              src={data.userImage}
              alt="profile user"
              className="w-10 h-10 rounded-full"
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
            <span>{data.username}</span>
            <span className="place-self-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-asterisk preview-icon"
              >
                <path d="M12 5v14" />
                <path d="m18.065 8.496-12.125 7" />
                <path d="m5.94 8.504 12.125 7" />
              </svg>
            </span>
            <span>
              {new Date(data.created_at).toLocaleString("sv-Se", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
            <PostCategoryIcons category={data.category} />
          </div>
        </div>
        <div className="flex">
          {data.isAuthor && (
            <div className="flex justify-end gap-2">
              <UpdateButton slug={data.slug} type="icon" />
              <DeleteButton
                id={data.id}
                type="icon"
                deleteFunction={DeletePostAction}
                onDeleteSuccess={onDeleteSuccess}
              />
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        {data.PostImages.length === 0 && null}
        {data.PostImages.length > 0 && (
          <div className="flex justify-start">
            {data.PostImages.map((image) => (
              <img
                key={image.id}
                src={image.image_url}
                alt={data.title}
                className="h-50 w-auto"
              />
            ))}
          </div>
        )}
      </div>

      {data.content && <p>{data.content}</p>}
      <div className="my-4">
        {data.userId && <AddCommentForm postId={data.id} />}
        <PostComments
          postId={data.id}
          isAuthor={data.isAuthor}
          userId={data.userId}
        />
      </div>
    </div>
  );
};

export default Post;
