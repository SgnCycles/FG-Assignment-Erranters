import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyPostsFeed from "@/components/posts/MyPostsFeed";

const MyPostsPage = () => {
  
  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          My <span className="text-old-gold">Posts</span>
        </h1>
        <CreatePostButton />
      </div>
      <div className="main-layout-posts-feed ">
       <MyPostsFeed />
      </div>
    </div>
  );
};

export default MyPostsPage;