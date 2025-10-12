import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/Favorites";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";

const MovieCard = ({ movie }) => {
  const { Title, Year, Poster, imdbRating, Language, imdbID } = movie;
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { user } = useAuth();

  const favoriteDoc = favorites.find((f) => f.imdbID === imdbID);
  const isFavorite = !!favoriteDoc;
  
  const watchlistDoc = watchlist.find((w) => w.imdbID === imdbID);
  const isInWatchlist = !!watchlistDoc;

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please login to add favorites");
      return;
    }
    
    try {
      if (isFavorite) {
        await removeFromFavorites(favoriteDoc.$id);
      } else {
        await addToFavorites(movie, user.$id);
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  const handleWatchlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please login to manage watchlist");
      return;
    }
    
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(watchlistDoc.$id);
      } else {
        await addToWatchlist(movie);
      }
    } catch (error) {
      console.error("Error handling watchlist:", error);
    }
  };

  return (
    <div className="relative group">
      <Link
        to={`/movie/${imdbID}`}
        className="hover:scale-[1.02] transition-transform duration-300 block"
      >
        <div className="movie-card  overflow-hidden  hover:shadow-lg transition-shadow duration-300">
          {/* Poster */}
          <img
            src={Poster && Poster !== "N/A" ? Poster : "/no-movie.png"}
            alt={Title || "Movie Poster"}
            className="w-full h-72 object-cover object-top"
          />

          {/* Title + Details */}
          <div className="p-4">
            <h3 className="text-[16px] font-semibold text-white line-clamp-1">
              {Title || "Untitled Movie"}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-300 mt-2 flex-wrap text-[14px]">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <img src="/star.svg" alt="star" className="w-4 h-4" />
                <span>
                  {imdbRating && imdbRating !== "N/A" ? imdbRating : "N/A"}
                </span>
              </div>

              <span>•</span>

              {/* Language */}
              <p className="line-clamp-1">{Language ? Language.split(",")[0] : "Unknown"}</p>

              <span>•</span>

              {/* Year */}
              <p>{Year || "N/A"}</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button
          onClick={handleFavorite}
          className="bg-black/80 hover:bg-black text-white p-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        
        <button
          onClick={handleWatchlist}
          className="bg-black/80 hover:bg-black text-white p-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
          title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          {isInWatchlist ? "✅" : "➕"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;