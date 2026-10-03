import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import EditPageForm from "./form";

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
    <div className="grow">
      {data && (
        <div>
          <h1>{`Edit: ${data.title}`}</h1>
          <EditPageForm
            initialValues={{
              title: data.title,
              content: data.content,
              images: data.images,
            }}
            postId={data.id}
          />
        </div>
      )}
    </div>
  );
};

export default EditPostPage;