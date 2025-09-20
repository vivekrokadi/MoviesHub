import React from "react";
import { useFavorites } from "../context/Favorites";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  return (
    <div>
      <main>
        <div className="pattern" />
        <div className="wrapper">
            <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-3xl text-white self-start border-2 border-white rounded-md px-4 py-1 font-bold cursor-pointer hover:scale-105 transition duration-300"
          >
            &larr;
          </button>
          <h1 className="text-4xl font-bold mb-4">
            My <span className="text-gradient">Favorites</span>
          </h1>
        </div>

        {favorites.length === 0 ? (
          <p className="text-2xl font-medium text-gray-400 text-center">
            No favorites yet. add some movies
          </p>
        ) : (
          <div className="flex gap-7 flex-wrap justify-center sm:justify-start">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
        </div>
        
      </main>
    </div>
  );
}

export default Favorites;
