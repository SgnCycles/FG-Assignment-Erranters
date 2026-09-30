import Link from "next/link";
import SearchBox from "../SearchBox";
import NavMenu from "../NavMenu";

const Header = ({ username }: { username?: string }) => {
  return (
    <header className="flex flex-col p-4">
      <div className="w-full grid grid-cols-3 gap-2">
        <div className="flex justify-start">
          <Link className="button" href="/feed">
            Erranters
          </Link>
        </div>
        <div className="">
          <SearchBox />
        </div>
        <div className="">
          <NavMenu />
        </div>
      </div>
      <div>Hi, {username}!</div>
    </header>
  );
};

export default Header;