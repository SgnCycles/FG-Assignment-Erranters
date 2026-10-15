import CreatePostButton from "@/components/buttons/CreatePostButton";
import HomePostsFeed from "@/components/posts/HomePostsFeed";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfileHomepage = async () => {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase, false);

  return (
    <div className="grow flex flex-col bg-mineral-green">
      <div className="flex justify-between items-center py-4 px-10 mx-4">
        <h1 className="heading text-ecru-white font-league-spartan">
          Posts from <span className="text-old-gold">Erranters</span>
        </h1>
        <CreatePostButton />
      </div>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow px-10">{data && <HomePostsFeed posts={data} />}</div>
    </div>
  );
};

export default ProfileHomepage;
