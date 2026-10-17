import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyFavouritePostsFeed from "@/components/posts/MyFavouritePostFeed";
import { getUserFavourites } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const MyFavouritesPage = async () => {
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access!");
  const { data, error } = await getUserFavourites(supabase, user.id, false);

  return (
    <div className="grow flex flex-col items-center justify-center bg-mineral-green">
      <div className="flex justify-between items-center p-4 w-[90%]">
        <h1 className="heading text-ecru-white font-league-spartan">
          Favourite <span className="text-old-gold">Posts</span>
        </h1>
        <CreatePostButton />
      </div>
      {error && <p>Failed Loading Posts...</p>}
      <div className="flex grow w-[90%]">
        {data && <MyFavouritePostsFeed posts={data} userId={user.id} />}
      </div>
    </div>
  );
};

export default MyFavouritesPage;