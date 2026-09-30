import HomePostsFeed from "@/components/HomePostsFeed";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfileHomepage = async () => {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase);

  return (
      <main className="grow">
        <h1 className="heading">Read latest from Erranters</h1>
        {error && <p>Failed Loading Posts...</p>}
        {data && <HomePostsFeed posts={data} />}
      </main>
  );
};

export default ProfileHomepage;