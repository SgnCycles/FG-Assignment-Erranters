import MyPostsSection from "@/components/MyPostsSection";
import { getMyPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const MyPostsPage = async() => {

  const supabase = await createClient();
    const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access!");
  const { data, error } = await getMyPosts(supabase, user.id, false);

  return (
    <main className="grow bg-mineral-green">
      <h1 className="heading">My Posts</h1>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow">
        <MyPostsSection posts={data} userId={user.id}/>
      </div>
    </main>
  );
};

export default MyPostsPage;