import { type UseFormRegister } from "react-hook-form";
import { type FormValues } from "@/components/forms/CreatePostForm/index";

const CategoryButtons = ({
  register,
}: {
  register: UseFormRegister<FormValues>;
}) => {
  return (
    <div className="flex gap-4 py-4 text-outer-space">
      <div className="relative group">
        <select
          id="category"
          {...register("category")}
          className="select-button select-button-category"
        >
          <option value="" disabled>
            Category
          </option>
          <option value="Hiking">Hiking</option>
          <option value="Cycling">Cycling</option>
          <option value="Marketplace">Marketplace</option>
        </select>
        <span className="category-dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down preview-icon transition-transform group-hover:rotate-90 group-hover:text-ecru-white"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </span>
      </div>
      <div className="relative group">
        <select {...register("post_type")} className="select-button select-button-type">
          <option value="" disabled>
            Type
          </option>
          <option value="Post">Post</option>
          <option value="Sell">Sell</option>
          <option value="Buy">Buy</option>
        </select>
        <span className="category-dropdown">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-down preview-icon transition-transform group-hover:rotate-90 group-hover:stroke-ecru-white"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default CategoryButtons;