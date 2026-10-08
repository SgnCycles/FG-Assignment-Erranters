type SortingButtonPropsType = {
  sortingOrder: boolean;
  setSortingOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortingButton = ({
  sortingOrder,
  setSortingOrder,
}: SortingButtonPropsType) => {
  return (
    <div className="flex justify-end pr-6">
      <select
        className="text-ecru-white cursor-pointer font-bold hover:text-old-gold"
        value={sortingOrder ? "Oldest" : "Newest"}
        onChange={(e) => setSortingOrder(e.target.value === "Oldest")}
      >
        <option value="Newest">↑↓ Newest
        </option>
        <option value="Oldest">↓↑ Oldest</option>
      </select>
    </div>
  );
};

export default SortingButton;