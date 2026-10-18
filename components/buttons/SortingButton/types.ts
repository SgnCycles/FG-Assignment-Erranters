export type SortingButtonPropsType = {
  type: "light" | "dark";
  sortingOrder: boolean;
  setSortingOrder: React.Dispatch<React.SetStateAction<boolean>>;
};