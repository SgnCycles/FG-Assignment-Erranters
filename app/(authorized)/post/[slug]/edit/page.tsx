import { getSinglePost } from "@/lib/supabase/queries";
import EditPostContent from "@/components/posts/EditPostContent";
import ErrorMessage from "@/components/ErrorMessage";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {

  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);

  return (
    <main className="bg-mineral-green text-ecru-white w-full flex flex-1 justify-center">
      <div className="create-edit-post-layout">
        {error ? (
          <ErrorMessage error="Something Went Wrong" />
        ) : !data ? (
          <ErrorMessage error="Post Not Found" />
        ) : (
          <>
            <p className="subtitle">Edit Your Post</p>
            <h1 className="heading">{data.title}</h1>
            <EditPostContent post={data} />
          </>
        )}
      </div>
    </main>
  );
};

export default EditPostPage;