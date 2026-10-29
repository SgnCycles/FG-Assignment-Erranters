import { getSinglePost } from "@/lib/supabase/queries";
import ErrorMessage from "@/components/errors/ErrorMessage";
import GoBackButton from "@/components/buttons/GoBackButton";
import Post from "@/components/posts/FullPost";

const PostPage = async ({ params }: { params: { slug: string } }) => {

  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);

  return (
    <main className="main-layout">
      <div className="w-full pl-4">
        <GoBackButton />
      </div>
      <div className="flex justify-center items-center w-full">
        {error ? (
          <ErrorMessage error="Something Went Wrong" />
        ) : !data ? (
          <ErrorMessage error="Post Not Found" />
        ) : (
          <Post post={data} />
        )}
      </div>
    </main>
  );
};

export default PostPage;