import CreatePostButton from "@/components/buttons/CreatePostButton";
import LatestPostsFeed from "@/components/posts/LatestPostsFeed";
import { getLatestPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const LatestPostsPage = async () => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access!");
  
  const { data, error } = await getLatestPosts(supabase, false);

  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          Latest <span className="text-old-gold">Posts</span>
        </h1>
        <CreatePostButton />
      </div>
      {error && <p>Failed Loading Posts...</p>}
      <div className="main-layout-posts-feed ">
        {data && <LatestPostsFeed posts={data} />}
      </div>
    </div>
  );
};

export default LatestPostsPage;