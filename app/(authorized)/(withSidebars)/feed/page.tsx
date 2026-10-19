import CreatePostButton from "@/components/buttons/CreatePostButton";
import HomePostsFeed from "@/components/posts/HomePostsFeed";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfileHomepage = async () => {
  
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase, false);

  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          Posts from <span className="text-old-gold">Erranters</span>
        </h1>
        <CreatePostButton />
      </div>
      {error && <p>Failed Loading Posts...</p>}
      <div className="main-layout-posts-feed ">
        {data && <HomePostsFeed posts={data} />}
      </div>
    </div>
  );
};

export default ProfileHomepage;