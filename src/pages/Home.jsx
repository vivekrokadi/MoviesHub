import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import { searchMovies, getMoviesByIds } from "../services/omdb";
import { useDebounce } from "react-use";
import { POPULAR_MOVIE_IDS } from "../constants/popularMovies";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]); // renamed for clarity
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
        fetchedMovies = await getMoviesByIds(POPULAR_MOVIE_IDS);
      } else {
        const searchData = await searchMovies(query);
        fetchedMovies = searchData?.Search || [];
      }

      const validMovies = fetchedMovies.filter(
        (m) => m && m.Poster && m.Poster !== "N/A"
      );

      setMovies(validMovies);
      setErrorMessage(null);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
      setMovies([]);
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
        <Navbar />
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
          ) : movies.length === 0 ? (
            <p className="text-gray-400">No results found.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>

      <footer>
        <div className="wrapper flex flex-col md:flex-row justify-between items-center gap-4 text-white">
          <p>© 2025 MoviesHub. All rights reserved.</p>
          <div>
            <p>Powered By OMDB API</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
