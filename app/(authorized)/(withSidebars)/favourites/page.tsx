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
    <div className="grow bg-mineral-green text-ecru-white">
      <h1 className="heading">Favourite Posts</h1>
      {error && <p>Failed Loading Favourite Posts...</p>}
      <div className="flex grow">
        <MyFavouritePostsFeed posts={data} userId={user.id} />
      </div>
    </div>
  );
};

export default MyFavouritesPage;