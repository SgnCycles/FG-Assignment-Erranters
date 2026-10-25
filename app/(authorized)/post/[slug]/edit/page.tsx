import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import EditPostForm from "@/components/forms/EditPostForm";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
  
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await getSinglePost(slug);

  if (!data) return;
  
  if (user && data && user.id !== data.author.id) {
    redirect("/feed");
  }

  return (
    <main className="bg-mineral-green text-ecru-white w-full flex flex-1 justify-center">
      {data && (
        <div className="create-edit-post-layout">
          <p className="subtitle">Edit Your Post</p>
          <h1 className="heading font-bebas-neu">{data.title}</h1>
          <EditPostForm
            initialValues={{
              title: data.title,
              content: data.content,
              price: data.price,
              PostImages: data.PostImages,
              category: data.category,
              post_type: data.post_type,
              location: data.location,
              slug: data.slug,
            }}
            postId={data.id}
          />
        </div>
      )}
    </main>
  );
};

export default EditPostPage;