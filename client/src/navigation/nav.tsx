import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between h-12 text-sm">
      <Link to={"/"} className="hover:underline">
        Home
      </Link>

      <Link to={"/"} className="hover:underline">
        blog
      </Link>
    </nav>
  );
};

export default Nav;
