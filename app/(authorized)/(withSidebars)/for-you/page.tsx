import CreatePostButton from "@/components/buttons/CreatePostButton";
import ForYouPostsFeed from "@/components/posts/ForYouPostFeed";
import { getForYouPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ForYouPage = async () => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access!");
  
  const { data, error } = await getForYouPosts(supabase, user.id, false);

  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          People you <span className="text-old-gold">follow</span>
        </h1>
        <CreatePostButton />
      </div>
      {error && <p>Failed Loading Posts...</p>}
      <div className="main-layout-posts-feed ">
        {data && <ForYouPostsFeed posts={data} userId={user.id} />}
      </div>
    </div>
  );
};

export default ForYouPage;