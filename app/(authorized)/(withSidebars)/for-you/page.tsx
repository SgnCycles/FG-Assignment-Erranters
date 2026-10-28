import CreatePostButton from "@/components/buttons/CreatePostButton";
import ForYouPostsFeed from "@/components/posts/ForYouPostFeed";

const ForYouPage = () => {
  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          People you <span className="text-old-gold">follow</span>
        </h1>
        <div className="hidden lg:flex">
          <CreatePostButton />
        </div>
      </div>
      <div className="main-layout-posts-feed ">
        <ForYouPostsFeed />
      </div>
    </div>
  );
};

export default ForYouPage;