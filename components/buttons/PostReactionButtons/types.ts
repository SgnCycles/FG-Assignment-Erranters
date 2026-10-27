import { DeleteButtonPropsType } from "../DeleteButton/types";

export type PostReactionButtonPropsType = {
  postId: string;
  onFavouriteDeleteSuccess?: () => void;
  slug: string;
  deleteFunction: DeleteButtonPropsType["deleteFunction"];
  onDeleteSuccess: () => void;
  isAuthor: boolean;
  postTitle: string;
  postCategory: string;
};