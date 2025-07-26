import { useEffect, useState } from "react";

const popularMovieIDs = [
  "tt0111161",
  "tt1375666",
  "tt0848228",
  "tt0468569",
  "tt4154796",
  "tt7286456",
  "tt26548265",
  "tt0816692",
  "tt10872600",
  "tt15398776",
  "tt1160419",
  "tt8178634",
];

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const movieData = await Promise.all(
        popularMovieIDs.map(async (id) => {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${
              import.meta.env.VITE_OMDB_API_KEY
            }&i=${id}`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch Movies");
          }
          const data = await res.json();

          if (data.Response === "False") {
            setErrorMessage(data.Error || "Failed to fetch movies");
            setMovies([]);
            return;
          }
          return data;
        })
      );
      setMovies(movieData);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();

  },[])

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">🔥 Popular Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="content">
              <h3 className="text-md font-semibold">{movie.Title}</h3>
              <p className="text-sm text-gray-600">{movie.Year}</p>

              <p className="rating"> {movie.imdbRating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
