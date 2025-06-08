import { BiLogoReact } from "react-icons/bi";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav
      className="bg-slate-800 shadow-lg flex items-center 
      justify-around py-3 px-32 fixed top-0 left-0 w-full">
      <Link to="/">
        <span
          className="font-semibold text-lg flex items-center 
        gap-3 text-blue-400"
        >
          <BiLogoReact className="text-6xl" />
          <span className="font-semibold text-2xl">React Router</span>
        </span>
      </Link>

      <div className="flex items-center gap-5 text-black">
      <Link
        to="/"
        className="py-1 px-3 text-lg font-light text-white 
        hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300"
      >
        Home
      </Link>

      <Link
        to="/about"
        className="py-1 px-3 text-lg font-light text-white 
        hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300"
      >
        About
      </Link>

      <Link
        to="/services"
        className="py-1 px-3 text-lg font-light text-white 
        hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300"
      >
        Services
      </Link>

      <Link
        to="/contact"
        className="py-1 px-3 text-lg font-light text-white 
        hover:text-sky-300 rounded-2xl hover:bg-slate-700 transition duration-300"
      >
        Contact
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;
