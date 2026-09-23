import Link from "next/link";
import AccountLinks from "./accountLinks";
import SearchBox from "../SearchBox";

const Header = () => {
  return (
    <header className="flex justify-between p-4 border-2 border-b-sushi">
      <Link className="button" href="/">
        Erranters
      </Link>
      <SearchBox />
      <AccountLinks />
    </header>
  );
};

export default Header;