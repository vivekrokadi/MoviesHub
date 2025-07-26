import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({
  movie: { Title, Year, Poster, imdbRating, Language,imdbID },
}) => {
  return (
    <Link
      to={`/movie/${imdbID}`}
      className="hover:scale-[1.01] transition"
    >
      <div className="movie-card">
        <img
          src={Poster && Poster !== "N/A" ? Poster : "/no-movie.png"}
          alt={Title}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div className="mt-4">
          <h3 className="text-lg font-semibold">{Title}</h3>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <img src="/star.svg" alt="star" className="w-4 h-4" />
              <span>{imdbRating !== "N/A" ? imdbRating : "N/A"}</span>
            </div>

            <span>•</span>
            <p>{Language?.split(",")[0]}</p>

            <span>•</span>
            <p>{Year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
