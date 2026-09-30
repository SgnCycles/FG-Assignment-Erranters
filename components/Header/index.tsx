import Link from "next/link";
import AccountLinks from "./accountLinks";
import SearchBox from "../SearchBox";
import NavMenu from "../NavMenu";

const Header = ({ username }: { username?: string }) => {
  return (
    <header className="flex flex-col p-4 border-2 border-b-apple">
      <div className="flex w-full justify-between">
        <Link className="button" href="/feed">
          Erranters
        </Link>
        <SearchBox />
        <AccountLinks />
      </div>
      <div>Hi, {username}!</div>
      <NavMenu />
    </header>
  );
};

export default Header;