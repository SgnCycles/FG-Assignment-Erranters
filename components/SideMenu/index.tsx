"use client";
import { usePathname, useRouter } from "next/navigation";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";

const MobileSideMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { postCategory, setPostCategory } =
    usePostCategoryContext() as PostCategoryContextType;

  return (
    <div className="flex lg:hidden w-full justify-evenly mt-2">
      <div className="relative">
        <select
          value={pathname}
          onChange={(e) => router.push(e.target.value)}
          className="select-posts-button"
        >
          <option value="" disabled>
            Discover
          </option>
          <option value="/feed">All Posts</option>
          <option value="/latest">Latest</option>
          <option value="/for-you">For You</option>
          <option value="/my-posts">My Posts</option>
          <option value="/favourites">Favourites</option>
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
      <div className="relative">
        <select
          value={postCategory}
          onChange={(e) => setPostCategory(e.target.value)}
          className="select-posts-button"
        >
          <option value="" disabled>
            Topics
          </option>
          <option value="All">All</option>
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
    </div>
  );
};

export default MobileSideMenu;
