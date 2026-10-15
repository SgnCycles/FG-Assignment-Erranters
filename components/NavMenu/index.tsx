"use server";
import { LogOut } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";

const NavMenu = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center h-full w-full justify-evenly" aria-label="Main navigation">
      {user && (
        <>
          <Link
            className="bg-ecru-white hover:bg-old-gold text-mineral-green w-auto flex gap-4 py-2 px-4 rounded-2xl border font-semibold"
            href="/create-post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3e595d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-square-pen preview-icon"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
            Create Post
          </Link>
          <Link href="/feed" title="Home" className="tooltip">
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
              className="lucide lucide-house preview-icon stroke-ecru-white hover:stroke-old-gold"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span className="tooltipText">Home</span>
          </Link>
          <Link href="/notifications" className="tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#faf9f2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-bell preview-icon stroke-ecru-white hover:stroke-old-gold"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
            </svg>
            <span className="tooltipText">Notifications</span>
          </Link>
          <Link href="/profile" className="tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#faf9f2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-user-round preview-icon stroke-ecru-white hover:stroke-old-gold"
            >
              <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
              <circle cx="12" cy="11" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="tooltipText">Profile</span>
          </Link>
          <button onClick={LogOut} className="cursor-pointer tooltip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#faf9f2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out preview-icon stroke-ecru-white hover:stroke-old-gold"
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