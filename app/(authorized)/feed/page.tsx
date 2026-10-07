import PostsSection from "@/components/posts/PostsSection";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfileHomepage = async () => {
  
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase, false);

  return (
    <main className="grow flex flex-col bg-mineral-green">
      <h1 className="heading text-ecru-white font-league-spartan">
        Posts from Erranters
      </h1>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow">
        <PostsSection posts={data} />
      </div>
    </main>
  );
};

export default ProfileHomepage;