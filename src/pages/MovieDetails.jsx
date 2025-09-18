import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `${API_BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Spinner />
    </div>
  );
}


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-3xl text-white self-start border-2 border-white rounded-md px-4 py-1 font-bold cursor-pointer hover:scale-105 transition duration-300"
        >
          &larr;
        </button>
        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/no-movie.png"}
            alt={movie.Title}
            className="w-full md:w-1/3 rounded shadow object-cover "
          />
          <div className="">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {movie.Title} ({movie.Year})
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-gray-400">{movie.Plot}</p>
            <ul className="mt-4 text-base sm:text-lg space-y-2 text-gray-400">
              <li className="flex gap-1">
                <strong>Rating:</strong> <img src="/star.svg" alt="" /> {movie.imdbRating}
              </li>
              <li>
                <strong>Genre:</strong> {movie.Genre}
              </li>
              <li>
                <strong>Language:</strong> {movie.Language}
              </li>
              <li>
                <strong>Director:</strong> {movie.Director}
              </li>
              <li>
                <strong>Actors:</strong> {movie.Actors}
              </li>
              <li>
                <strong>Runtime:</strong> {movie.Runtime}
              </li>
              <li>
                <strong>BoxOffice collection:</strong> {movie.BoxOffice}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
