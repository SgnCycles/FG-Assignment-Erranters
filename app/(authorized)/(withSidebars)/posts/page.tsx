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
    <main className="grow bg-mineral-green text-ecru-white">
      <h1 className="heading">My Posts</h1>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow">
        {data && <MyPostsFeed posts={data} userId={user.id} />}
      </div>
    </main>
  );
};

export default MyPostsPage;