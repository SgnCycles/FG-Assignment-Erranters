"use client";
import Link from "next/link";
import EditButton from "@/components/buttons/EditButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import { DeletePostAction } from "@/actions/delete-post-action";
import { useQueryClient } from "@tanstack/react-query";

type MyPostPropsType = {
  id: string;
  slug: string;
  title: string;
  category: string;
  username: string;
  created_at: string;
  PostImages: {
    id: string;
    image_url: string;
    position: number;
  }[];
};

const MyPost = ({ ...post }: MyPostPropsType) => {
  const queryClient = useQueryClient();
  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["my-posts"],
    });
  };

  return (
    <div className="block border border-apple  bg-ecru-white rounded-2xl p-4 m-4">
      <div>
        <div className="flex justify-end">
          <EditButton slug={post.slug} type="icon" />
          <DeleteButton
            id={post.id}
            type="icon"
            deleteFunction={DeletePostAction}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
        <Link href={`/${post.slug}`}>
          <div className="w-full flex justify-between">
            <span>{post.category}</span>
          </div>
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-right italic">posted by {post.username}</p>
          <p>
            posted on{" "}
            {new Date(post.created_at).toLocaleString("sv-Se", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default MyPost;
