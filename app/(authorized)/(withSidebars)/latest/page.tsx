import CreatePostButton from "@/components/buttons/CreatePostButton";
import LatestPostsFeed from "@/components/posts/LatestPostsFeed";

const LatestPostsPage = () => {
  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          Latest <span className="text-old-gold">Posts</span>
        </h1>
        <div className="hidden lg:flex">
          <CreatePostButton />
        </div>
      </div>
      <div className="main-layout-posts-feed ">
        <LatestPostsFeed />
      </div>
    </div>
  );
};

export default LatestPostsPage;
