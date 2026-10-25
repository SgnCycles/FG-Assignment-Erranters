import { PostCommentsType } from "@/lib/supabase/queries";

export type CommentsPropsType = {
  comment: PostCommentsType;
  isAuthor: boolean;
  userId: string | null;
  postId: string;
  slug: string;
  onDeleteSuccess: () => void;
};