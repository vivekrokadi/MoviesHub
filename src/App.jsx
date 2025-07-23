import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import Spinner from "./components/Spinner";
import { useDebounce } from "react-use";
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

const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebounceSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    try {
      let fetchedMovies = [];

      if (query.trim() === "") {
        // Fetch popular movies
        fetchedMovies = await Promise.all(
          popularMovieIDs.map(async (id) => {
            const endpoint = `${API_BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
            const response = await fetch(endpoint);
            const data = await response.json();
            return data;
          })
        );
      } else {
        // Fetch search results
        const endpoint = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
          query
        )}&plot=full`;
        const response = await fetch(endpoint);
        const data = await response.json();
        fetchedMovies = data.Search || []; // in case no results
      }

      const validMovies = fetchedMovies.filter(
        (movie) => movie.Response !== "False"
      );
      setPopularMovies(validMovies);
      setErrorMessage(null);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
      setPopularMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
      <nav className="w-full  flex items-center">
        <img className="w-[40px]" src="logo.png" alt="" /> 
        <h4 className="text-[20px] text-white font-medium">MoviesHub</h4>
       
      </nav>
        <header>
          <img src="/hero.png" alt="Hero" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="my-[40px]">
            {searchTerm.trim()
              ? `Search Results for "${searchTerm}"`
              : "Popular Movies"}
          </h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
