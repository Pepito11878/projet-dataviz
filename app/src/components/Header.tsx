import { NavLink } from "react-router";

export function Header() {
  return (
    <header className="bg-[#BEBEBE] text-black px-10 py-4 gap-10 max-w-7xl mx-auto border-2 rounded-md">
      <nav className="w-full px-8 py-4 flex items-center gap-6"></nav>
      <NavLink
        to="/"
        className="{({ isActive }) =>
      ` px-4 py-2 rounded-full hover:bg-black hover:text-white"
      >
        Accueil
      </NavLink>

      <NavLink
        to="/Analyse"
        className="{({ isActive }) =>
      ` px-4 py-2 rounded-full hover:bg-black hover:text-white"
      >
        Analyse
      </NavLink>
    </header>
  );
}
