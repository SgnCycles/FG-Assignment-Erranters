import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyPostsFeed from "@/components/posts/MyPostsFeed";
import { getMyPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const MyPostsPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access!");
  const { data, error } = await getMyPosts(supabase, user.id, false);

  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          My <span className="text-old-gold">Posts</span>
        </h1>
        <CreatePostButton />
      </div>
      {error && <p>Failed Loading Posts...</p>}
      <div className="main-layout-posts-feed ">
        {data && <MyPostsFeed posts={data} userId={user.id} />}
      </div>
    </div>
  );
};

export default MyPostsPage;