import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import NavMenu from "@/components/NavMenu";

const Header = ({ username }: { username?: string }) => {
  return (
    <header className="flex flex-col p-4 bg-mineral-green">
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="flex justify-start">
          <Link className="logo-button group" href="/feed">
            <span className="group-hover:text-apple">Errant</span>
            <span className="grid items-center text-apple">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-line-dot-left-horizontal preview-icon"
              >
                <path d="M9 12h12" />
                <circle cx="6" cy="12" r="3" />
              </svg>
            </span>
            <span className="text-apple group-hover:text-ecru-white">ers</span>
          </Link>
        </div>
        <div className="">
          <SearchBox />
        </div>
        <div className="">
          <NavMenu />
        </div>
      </div>
      <div className="text-ecru-white font-semibold p-2 flex justify-end">
        Hi, {username}!
      </div>
    </header>
  );
};

export default Header;