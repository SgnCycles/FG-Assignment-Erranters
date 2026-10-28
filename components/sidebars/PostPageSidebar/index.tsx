"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePostCategoryContext } from "@/context/postCategoryContext";
import type { PostCategoryContextType } from "@/types/types";

const PostPageSidebar = () => {
  const pathname = usePathname();
  const { postCategory, setPostCategory } =
    usePostCategoryContext() as PostCategoryContextType;

  return (
    <aside className="hidden lg:flex flex-col">
      <h2 className="sidebar-heading-h2">Discover</h2>
      <nav
        aria-label="Sidebar navigation"
        className="w-full flex justify-center"
      >
        <ul className="flex flex-col gap-2 mt-4 items-center text-ecru-white/50">
          <li className="w-full">
            <Link
              href="/feed"
              className={`sidebar-item ${pathname === "/feed" ? "active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock preview-icon mr-2"
              >
                <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
                <path d="M15 3v5a1 1 0 0 0 1 1h5" />
              </svg>
              All Posts
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/latest"
              className={`sidebar-item ${pathname === "/latest" ? "active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock preview-icon mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Latest
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/for-you"
              className={`sidebar-item ${pathname === "/for-you" ? "active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sparkles preview-icon mr-2"
              >
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                <path d="M20 2v4" />
                <path d="M22 4h-4" />
                <circle cx="4" cy="20" r="2" />
              </svg>
              For You
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/my-posts"
              className={`sidebar-item ${pathname === "/my-posts" ? "active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-round preview-icon mr-2"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              My Posts
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/favourites"
              className={`sidebar-item ${pathname === "/favourites" ? "active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle-more preview-icon mr-2"
              >
                <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
              </svg>
              Favourites
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="w-full border-ecru-white/50 my-10 border-t-[0.5px]"></hr>
      <h2 className="sidebar-heading-h2">Topics</h2>
      <div>
        <ul className="flex flex-col gap-2 mt-4 items-center text-ecru-white/50">
          <li className="w-full">
            <button
              className={`sidebar-item ${postCategory === "All" ? "active" : ""}`}
              onClick={() => setPostCategory("All")}
            >
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
                className="lucide lucide-dot preview-icon text-old-gold"
              >
                <circle cx="12" cy="12" r="1" />
              </svg>
              All Posts
            </button>
          </li>
          <li className="w-full">
            <button
              className={`sidebar-item ${postCategory === "Hiking" ? "active" : ""}`}
              onClick={() => setPostCategory("Hiking")}
            >
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
                className="lucide lucide-dot preview-icon text-old-gold"
              >
                <circle cx="12" cy="12" r="1" />
              </svg>
              Hiking
            </button>
          </li>
          <li className="w-full">
            <button
              className={`sidebar-item ${postCategory === "Cycling" ? "active" : ""}`}
              onClick={() => setPostCategory("Cycling")}
            >
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
                className="lucide lucide-dot preview-icon text-old-gold"
              >
                <circle cx="12" cy="12" r="1" />
              </svg>
              Cycling
            </button>
          </li>
          <li className="w-full">
            <button
              className={`sidebar-item ${postCategory === "Marketplace" ? "active" : ""}`}
              onClick={() => setPostCategory("Marketplace")}
            >
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
                className="lucide lucide-dot preview-icon text-old-gold"
              >
                <circle cx="12" cy="12" r="1" />
              </svg>
              Marketplace
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default PostPageSidebar;
