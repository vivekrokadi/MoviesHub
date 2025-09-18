import { Link } from "react-router-dom";

import React from 'react'

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between gap-2 p-4">
      <Link to="/" className="flex items-center gap-2">
        <img className="w-[60px] sm:w-[150px]" src="/MoviesHub logo.png" alt="MoviesHub logo" />
      </Link>
        <ul className="flex items-center gap-6 text-white font-semibold">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/watchlist">Watchlist</Link>
            </li>
            <li>
                <Link to="/Favorites">Favorites</Link>
            </li>
        </ul>


    </nav>
  )
}

export default Navbar