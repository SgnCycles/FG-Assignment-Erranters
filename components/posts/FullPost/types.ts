export type PostPropsType = {
  id: string;
  slug: string;
  title: string;
  content: string;
  username: string;
  userImage: string | null;
  isAuthor: boolean;
  created_at: string;
  userId: string | null;
  category: string;
  PostImages: {
    id: string;
    image_url: string;
    position: number;
  }[];
};