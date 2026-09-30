import DeleteButton from "@/components/DeleteButton";
import ErrorMessage from "@/components/ErrorMessage";
import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await getSinglePost(slug);
  const isAuthor: boolean =
    user && data && user.id === data.author.id ? true : false;
    
  if (error) {
    return <ErrorMessage error={error.message} />;
  }

  if (!data) return <ErrorMessage error="Post Not Found"/>;

  return (
    <div className="grow grid place-items-center">
      {data && (
        <div className="border-2 border-apple p-8 rounded-2xl">
          {data.title && <h1 className="heading">{data.title}</h1>}
          {data.content && <p>{data.content}</p>}
          <p className="mt-8">created by {data.author.username}</p>
          {isAuthor && (
            <div className="mt-4 flex justify-end">
              <DeleteButton id={data.id} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostPage;