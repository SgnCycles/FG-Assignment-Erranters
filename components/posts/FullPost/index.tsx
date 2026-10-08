"use client";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/buttons/DeleteButton";
import UpdateButton from "@/components/buttons/EditButton";
import { DeletePostAction } from "@/actions/delete-post-action";
import PostComments from "@/components/comments/PostComments";
import AddCommentForm from "@/components/comments/AddCommentForm";

type PostProps = {
  id: string;
  slug: string;
  title: string;
  content: string;
  username: string;
  isAuthor: boolean;
  created_at: string;
  userId: string | null;
  PostImages: {
    id: string;
    image_url: string;
    position: number;
  }[];
};

const Post = ({ ...data }: PostProps) => {
  const router = useRouter();
  const onDeleteSuccess = () => {
    router.push("/feed");
  };

  return (
    <div className="flex flex-col h-full justify-between p-8 rounded-2xl grow bg-mineral-green text-ecru-white">
      <div className="flex flex-col mb-4">
        {data.title && <h1 className="heading">{data.title}</h1>}
        <p className="text-right italic">
          published:{" "}
          {new Date(data.created_at).toLocaleString("sv-Se", {
            dateStyle: "short",
            timeStyle: "short",
          })}{" "}
          / created by {data.username}
        </p>
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
      {data.isAuthor && (
        <div className="flex justify-end">
          <UpdateButton slug={data.slug} type="text" />
          <DeleteButton
            id={data.id}
            type="text"
            deleteFunction={DeletePostAction}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      )}
      <div>
        <PostComments
          postId={data.id}
          isAuthor={data.isAuthor}
          userId={data.userId}
        />
        {data.userId && <AddCommentForm postId={data.id} />}
      </div>
    </div>
  );
};

export default Post;