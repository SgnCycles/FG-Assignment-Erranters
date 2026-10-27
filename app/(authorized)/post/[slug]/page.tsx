import { getSinglePost } from "@/lib/supabase/queries";
import ErrorMessage from "@/components/ErrorMessage";
import GoBackButton from "@/components/buttons/GoBackButton";
import Post from "@/components/posts/FullPost";

const PostPage = async ({ params }: { params: { slug: string } }) => {

  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);

  if (error) {
    return <ErrorMessage error={error.message} />;
  }

  if (!data) return <ErrorMessage error="Post Not Found" />;

  return (
    <main className="main-layout">
      <div className="w-full pl-4">
        <GoBackButton />
      </div>
      <div className="flex justify-center items-center w-full">
        <Post post={data}/>
      </div>
    </main>
  );
};

export default PostPage;