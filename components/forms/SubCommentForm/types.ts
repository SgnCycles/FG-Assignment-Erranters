export type AddSubCommentFormPropsType = {
  postId: string;
  slug: string;
  parentId: string;
  setReplyOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
