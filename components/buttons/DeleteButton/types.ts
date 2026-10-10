export type DeleteButtonPropsType = {
  id: string;
  type: "text" | "icon";
  deleteFunction: (id: string) => Promise<unknown>;
  onDeleteSuccess?: () => void;
};