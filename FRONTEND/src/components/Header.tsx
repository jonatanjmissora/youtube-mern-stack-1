import { Plus } from "lucide-react";
import { Link, useLocation } from "react-router";

export default function Header() {

  const location = useLocation()


  return (
    <header className="w-full py-6">
      <div className="flex justify-between">
        <Link to="/">
          Notas
        </Link>
        <nav className="flex gap-2">
          <Link to="/rickandmorty">
            Inicio
          </Link>
          <Link to="/rickandmorty/episodes">
            Episodios
          </Link>
          <Link to="/rickandmorty/characters">
            Personajes
          </Link>
        </nav>
        {
          location.pathname === "/" &&
          <Link to={"/createNote"} className="flex gap-1 items-center group">
            <span className="text-blue-600 group-hover:text-blue-400 duration-200">Nueva</span>
            <Plus className="size-6 pt-1 text-blue-600 group-hover:text-blue-400 duration-200" />
          </Link>
        }
      </div>
    </header>
  )
}