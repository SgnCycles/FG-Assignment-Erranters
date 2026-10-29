import { getSinglePost } from "@/lib/supabase/queries";
import EditPostContent from "@/components/posts/EditPostContent";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {

  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);
  
  if (error) {
    return <ErrorMessage error={error.message} />;
  }

  if (!data) return <ErrorMessage error="User Not Found" />;

  return (
    <main className="bg-mineral-green text-ecru-white w-full flex flex-1 justify-center">
      <div className="create-edit-post-layout">
        <p className="subtitle">Edit Your Post</p>
        <h1 className="heading font-bebas-neu">{data.title}</h1>
        <EditPostContent post={data} />
      </div>
    </main>
  );
};

export default EditPostPage;