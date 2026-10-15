"use client";
import { LogOut } from "@/actions/logout-action";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  
  const pathname = usePathname();
  const { user } = useUserContext() as userContextType;

  return (
    <nav
      className="flex items-center h-full w-full justify-end gap-6"
      aria-label="Main navigation"
    >
      {user && (
        <>
          <Link
            href="/feed"
            title="Home"
            className={`tooltip group ${pathname === "/feed" ? "active" : ""}`}
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
              className={`lucide lucide-bell preview-icon ${pathname === "/feed" ? "stroke-outer-space" : "stroke-ecru-white/50"} group-hover:stroke-ecru-white`}
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span className="tooltipText">Home</span>
          </Link>
          <Link
            href="/create-post"
            title="Create Post"
            className={`tooltip group ${pathname === "/create-post" ? "active" : ""}`}
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
              className={`lucide lucide-bell preview-icon ${pathname === "/create-post" ? "stroke-outer-space" : "stroke-ecru-white/50"} group-hover:stroke-ecru-white`}
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            <span className="tooltipText">Create Post</span>
          </Link>
          <Link
            href="/notifications"
            className={`tooltip group ${pathname === "/notifications" ? "active" : ""}`}
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
              className={`lucide lucide-bell preview-icon ${pathname === "/notifications" ? "stroke-outer-space" : "stroke-ecru-white/50"} group-hover:stroke-ecru-white`}
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
            </svg>
            <span className="tooltipText">Notifications</span>
          </Link>
          <Link
            href="/profile"
            className={`tooltip group ${pathname === "/profile" ? "active" : ""}`}
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
              className={`lucide lucide-bell preview-icon group-hover:stroke-ecru-white ${pathname === "/profile" ? "stroke-outer-space" : "stroke-ecru-white/50"}`}
            >
              <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
              <circle cx="12" cy="11" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="tooltipText">Profile</span>
          </Link>
          <button onClick={LogOut} className="tooltip group">
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
              className="lucide lucide-bell preview-icon stroke-ecru-white/50 group-hover:stroke-ecru-white"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
            <span className="tooltipText -right-6">Log Out</span>
          </button>
        </>
      )}
    </nav>
  );
};

export default NavMenu;