import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      
      <Link to="/" className="flex items-center gap-2">
        <img
          className="w-[120px] sm:w-[150px]"
          src="/MoviesHub logo.png"
          alt="MoviesHub logo"
        />
      </Link>

     
      <ul className="hidden md:flex items-center gap-6 text-white font-semibold">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/watchlist">Watchlist</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>

        {user ? (
          <>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] py-1.5 px-2.5 rounded-xl"
            >
              Logout
            </button>
            <span className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] px-3 uppercase py-1.5 rounded-full">
              {user.email.charAt(0)}
            </span>
          </>
        ) : (
          <li className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] py-1.5 px-2.5 rounded-xl">
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white text-2xl focus:outline-none"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full  flex flex-col items-center gap-6 py-6 md:hidden text-white font-semibold backdrop-blur-xs">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/watchlist" onClick={() => setIsOpen(false)}>Watchlist</Link>
          <Link to="/favorites" onClick={() => setIsOpen(false)}>Favorites</Link>

          {user ? (
            <>
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] py-1.5 px-4 rounded-xl"
              >
                Logout
              </button>
              <span className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] px-3 uppercase py-1.5 rounded-full">
                {user.email.charAt(0)}
              </span>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] py-1.5 px-4 rounded-xl"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
