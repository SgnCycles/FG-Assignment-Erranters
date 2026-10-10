export type MemberProfilePropsType = {
  username: string;
  userImage: string | null;
  bio: string | null;
  interests: string | null;
  postData: {
    id: string;
    title: string;
    slug: string;
    created_at: string;
    category: string;
    post_type: string;
    author: {
      id: string;
      username: string;
      profile_image: string | null;
    };
    PostImages: {
      id: string;
      image_url: string;
      position: number;
    }[];
  }[];
};