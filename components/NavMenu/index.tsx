import { navItems } from "@/data/navMenu";
import Link from "next/link";

const NavMenu = () => {
  return (
    <nav className="flex justify-around items-center h-10">
      {navItems &&
        navItems.map((item, index) => (
          <Link key={index} href={item.href}>
            {item.item}
          </Link>
        ))}
    </nav>
  );
};

export default NavMenu;