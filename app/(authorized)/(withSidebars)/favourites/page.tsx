import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyFavouritePostsFeed from "@/components/posts/MyFavouritePostFeed";
import { createClient } from "@/lib/supabase/serverClient";

const MyFavouritesPage = async () => {
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access!");

  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          Favourite <span className="text-old-gold">Posts</span>
        </h1>
        <CreatePostButton />
      </div>
      <div className="main-layout-posts-feed ">
      <MyFavouritePostsFeed userId={user.id} />
      </div>
    </div>
  );
};

export default MyFavouritesPage;