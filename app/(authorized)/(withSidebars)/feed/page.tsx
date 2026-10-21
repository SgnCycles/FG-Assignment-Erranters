import CreatePostButton from "@/components/buttons/CreatePostButton";
import HomePostsFeed from "@/components/posts/HomePostsFeed";

const ProfileHomepage = () => {

  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          Posts from <span className="text-old-gold">Erranters</span>
        </h1>
        <CreatePostButton />
      </div>
      <div className="main-layout-posts-feed ">
        <HomePostsFeed />
      </div>
    </div>
  );
};

export default ProfileHomepage;