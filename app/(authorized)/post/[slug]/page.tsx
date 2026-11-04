import { getSinglePost } from "@/lib/supabase/queries";
import ErrorMessage from "@/components/errors/ErrorMessage";
import Post from "@/components/posts/FullPost";
import Link from "next/link";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);

  return (
    <main className="main-layout">
      <div className="w-full pl-8">
        <Link href="/feed" className="go-back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left-to-line preview-icon"
          >
            <path d="M3 19V5" />
            <path d="m13 6-6 6 6 6" />
            <path d="M7 12h14" />
          </svg>
          Go Home
        </Link>
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
