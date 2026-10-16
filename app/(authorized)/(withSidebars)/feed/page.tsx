import CreatePostButton from "@/components/buttons/CreatePostButton";
import HomePostsFeed from "@/components/posts/HomePostsFeed";
import { getHomePosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfileHomepage = async () => {
  const supabase = await createClient();
  const { data, error } = await getHomePosts(supabase, false);

  return (
    <div className="grow flex flex-col items-center  justify-center bg-mineral-green">
      <div className="flex justify-between items-center py-4 px-4 w-[90%]">
        <h1 className="heading text-ecru-white font-league-spartan">
          Posts from <span className="text-old-gold">Erranters</span>
        </h1>
        <CreatePostButton />
      </div>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow w-[90%]">
        {data && <HomePostsFeed posts={data} />}
      </div>
    </div>
  );
};

export default ProfileHomepage;
