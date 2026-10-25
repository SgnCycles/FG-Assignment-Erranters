import CreatePostButton from "@/components/buttons/CreatePostButton";
import MyPostsFeed from "@/components/posts/MyPostsFeed";
import { createClient } from "@/lib/supabase/serverClient";

const MyPostsPage = async () => {
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Unauthorized access!");

  return (
    <div className="main-layout">
      <div className="main-layout-heading">
        <h1 className="heading">
          My <span className="text-old-gold">Posts</span>
        </h1>
        <CreatePostButton />
      </div>
      <div className="main-layout-posts-feed ">
       <MyPostsFeed userId={user.id} />
      </div>
    </div>
  );
};

export default MyPostsPage;