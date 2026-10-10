import GoBackButton from "@/components/buttons/GoBackButton";
import ErrorMessage from "@/components/ErrorMessage";
import Post from "@/components/posts/FullPost";
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
    <main className="grow flex flex-col items-between bg-mineral-green">
      <div className="w-full pl-4">
        <GoBackButton />
      </div>
      <div className="grow flex justify-center items-center">
        {data && (
          <Post
            {...data}
            username={data.author.username}
            isAuthor={isAuthor}
            userId={user?.id || null}
            userImage={data.author.profile_image || null}

          />
        )}
      </div>
    </main>
  );
};

export default PostPage;