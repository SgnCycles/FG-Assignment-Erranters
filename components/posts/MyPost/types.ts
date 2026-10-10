export type MyPostPropsType = {
  id: string;
  slug: string;
  title: string;
  category: string;
  username: string;
  userImage: string | null;
  created_at: string;
  PostImages: {
    id: string;
    image_url: string;
    position: number;
  }[];
};