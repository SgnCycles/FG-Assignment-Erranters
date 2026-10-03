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
    <main className="grow flex flex-col items-between bg-mineral-green">
      <div className="w-full ml-4">
        <button className="flex font-semibold text-ecru-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#faf9f2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-to-line preview-icon"
          >
            <path d="M3 19V5" />
            <path d="m13 6-6 6 6 6" />
            <path d="M7 12h14" />
          </svg>
          Go back
        </button>
      </div>
      <div className="grow flex justify-center items-center">
        {data && (
          <Post
            slug={slug}
            images={data.images}
            title={data.title}
            content={data.content}
            id={data.id}
            username={data.author.username}
            isAuthor={isAuthor}
            created_at={data.created_at}
          />
        )}
      </div>
    </main>
  );
};

export default PostPage;