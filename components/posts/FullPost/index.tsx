"use client";
import { useRouter } from "next/navigation";
import DeleteButton from "../../buttons/DeleteButton";
import UpdateButton from "../../buttons/EditButton";
import { DeletePostAction } from "@/actions/delete-post-action";
import PostComments from "@/components/comments/PostComments";
import AddCommentForm from "@/components/comments/AddCommentForm";

type PostProps = {
  id: string;
  slug: string;
  title: string;
  content: string;
  images: string | null;
  username: string;
  isAuthor: boolean;
  created_at: string;
  userId: string | null
};

const Post = ({ ...data}: PostProps) => {

  const router = useRouter();
  const onDeleteSuccess = () => {
    router.push("/feed");
  };
  
  return (
    <div className="flex flex-col border-2 border-apple p-8 rounded-2xl grow bg-blue-400">
      {data.title && <h1 className="heading">{data.title}</h1>}
      {!data.images && <p>No Images for this post</p>}
      {data.images && (
        <div>
          <img src={data.images} alt="" />
        </div>
      )}
      {data.content && <p>{data.content}</p>}
      <p className="mt-8">
        published:{" "}
        {new Date(data.created_at).toLocaleString("sv-Se", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>
      <p className="mt-8">created by {data.username}</p>
      {data.isAuthor && (
        <div className="mt-4 flex justify-end">
          <UpdateButton slug={data.slug} type="text" />
          <DeleteButton
            id={data.id}
            type="text"
            deleteFunction={DeletePostAction}
            onDeleteSuccess={onDeleteSuccess}
          />
        </div>
      )}
      <PostComments postId={data.id} isAuthor={data.isAuthor} userId={data.userId}/>
      {data.userId && <AddCommentForm postId={data.id}/>}
    </div>
  );
};

export default Post;