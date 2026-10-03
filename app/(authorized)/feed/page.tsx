import HomePostsFeed from "@/components/HomePostsFeed";
import PostPageSidebar from "@/components/PostPageSidebar";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfileHomepage = async () => {

  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase);

  return (
    <main className="grow flex flex-col bg-mineral-green">
      <h1 className="heading text-ecru-white font-league-spartan">
        Posts from Erranters
      </h1>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow">
        <PostPageSidebar />
        {data && <HomePostsFeed posts={data} />}
      </div>
    </main>
  );
};

export default ProfileHomepage;