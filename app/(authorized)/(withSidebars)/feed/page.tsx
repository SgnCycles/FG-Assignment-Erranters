import HomePostsFeed from "@/components/posts/HomePostsFeed";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfileHomepage = async () => {
  
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase, false);

  return (
    <div className="grow flex flex-col bg-mineral-green pr-5">
      <h1 className="heading text-ecru-white font-league-spartan">
        Posts from Erranters
      </h1>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow">
        {data && <HomePostsFeed posts={data}/>}
      </div>
    </div>
  );
};

export default ProfileHomepage;