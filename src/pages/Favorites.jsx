import React from "react";
import { useFavorites } from "../context/Favorites";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Please login to view favorites</h2>
          <button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] text-white px-6 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="pattern" />
      <div className="wrapper py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-white border-2 border-white rounded-md px-3 py-1 font-bold cursor-pointer hover:scale-105 transition duration-300"
          >
            &larr;
          </button>
          <h1 className="text-4xl font-bold">
            My <span className="text-gradient">Favorites</span>
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl font-medium text-gray-400 mb-4">
              No favorites yet. Add some movies!
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] text-white px-6 py-2 rounded-lg"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <div key={movie.$id} className="bg-gray-800/20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={movie.poster && movie.poster !== "N/A" ? movie.poster : "/no-movie.png"}
                  alt={movie.title}
                  className="w-full h-72 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-[16px] font-semibold text-white mb-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="space-y-1 text-gray-300">
                    <div className="flex items-center justify-between text-[12px]">
                      <span>Year: {movie.year}</span>
                      <div className="flex items-center gap-1">
                        <img src="/star.svg" alt="rating" className="w-4 h-4" />
                        <span>{movie.rating || "N/A"}</span>
                      </div>
                    </div>
                    <p>Language: {movie.language ? movie.language.split(",")[0] : "Unknown"}</p>
                  </div>
                  <button
                    onClick={() => removeFromFavorites(movie.$id)}
                    className="w-full mt-3 bg-purple-600/10 hover:bg-purple-700/20 text-purple-600 py-2 rounded-lg transition-colors border border-purple-600/20 duration-200 text-[12px]"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Favorites;