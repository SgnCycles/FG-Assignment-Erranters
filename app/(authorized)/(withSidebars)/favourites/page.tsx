import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyFavouritePostsFeed from "@/components/posts/MyFavouritePostFeed";

const MyFavouritesPage = () => {
  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          Favourite <span className="text-old-gold">Posts</span>
        </h1>
        <div className="hidden lg:flex">
          <CreatePostButton />
        </div>
      </div>
      <div className="main-layout-posts-feed ">
        <MyFavouritePostsFeed />
      </div>
    </div>
  );
};

export default MyFavouritesPage;