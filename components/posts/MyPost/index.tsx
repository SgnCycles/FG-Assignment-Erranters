"use client";
import Link from "next/link";
import EditButton from "@/components/buttons/EditButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import { DeletePostAction } from "@/actions/delete-post-action";
import { useQueryClient } from "@tanstack/react-query";
import PostReactionButtons from "@/components/buttons/PostReactionButtons";
import { MyPostPropsType } from "./types";

const MyPost = ({ ...post }: MyPostPropsType) => {
  const queryClient = useQueryClient();
  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["my-posts"],
    });
  };

  return (
    <div className="block border border-apple bg-ecru-white rounded-2xl p-4 m-4 text-outer-space">
      <Link href={`/post/${post.slug}`}>
        <div className="w-full flex justify-between">
          <div className="flex">
            {post.userImage ? (
              <img
                src={post.userImage}
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
              <span>{post.username}</span>
              <span className="place-self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
                {new Date(post.created_at).toLocaleString("sv-Se", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>
          <span>
            {post.category === "Hiking" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mountain preview-icon"
              >
                <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
              </svg>
            )}
            {post.category === "Cycling" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-bike preview-icon"
              >
                <circle cx="18.5" cy="17.5" r="3.5" />
                <circle cx="5.5" cy="17.5" r="3.5" />
                <circle cx="15" cy="5" r="1" />
                <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
              </svg>
            )}
            {post.category === "Marketplace" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-dollar-sign preview-icon"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
            )}
          </span>
        </div>
        <h3 className="font-bold text-lg">{post.title}</h3>
        <div className="mb-4">
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
        </div>
      </Link>
      <div className="flex justify-between">
        <PostReactionButtons />
        <div className="flex justify-end">
          <EditButton slug={post.slug} type="icon" />
          <DeleteButton
            id={post.id}
            type="icon"
            deleteFunction={DeletePostAction}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPost;