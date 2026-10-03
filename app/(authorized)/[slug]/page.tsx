import ErrorMessage from "@/components/ErrorMessage";
import Post from "@/components/Post";
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

  if (!data) return <ErrorMessage error="Post Not Found" />;

  return (
    <div className="grow grid place-items-center">
      <div>
        <button>Go back</button>
      </div>
      {data && (
        <Post
          slug={slug}
          images={data.images}
          title={data.title}
          content={data.content}
          id={data.id}
          username={data.author.username}
          isAuthor={isAuthor}
        />
      )}
    </div>
  );
};

export default PostPage;