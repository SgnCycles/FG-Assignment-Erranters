import type { SortingButtonPropsType } from "./types";

const SortingButton = ({
  type,
  sortingOrder,
  setSortingOrder,
}: SortingButtonPropsType) => {
  return (
    <div
      className={`${type === "dark" ? "pr-0" : "pr-4"} flex justify-end`}>
      <select
        className={`${type === "dark" ? "text-outer-space/80 hover:text-apple" : "text-ecru-white hover:text-old-gold"} cursor-pointer font-bold focus:outline-none`}
        value={sortingOrder ? "Oldest" : "Newest"}
        onChange={(e) => setSortingOrder(e.target.value === "Oldest")}
      >
        <option value="Newest">↑↓ Newest</option>
        <option value="Oldest">↓↑ Oldest</option>
      </select>
    </div>
  );
};

export default SortingButton;