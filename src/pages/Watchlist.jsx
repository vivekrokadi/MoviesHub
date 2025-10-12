import React, { useState, useEffect } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMovieById } from "../services/omdb";
import Spinner from "../components/Spinner";

function Watchlist() {
  const { watchlist, removeFromWatchlist, updateStatus } = useWatchlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [moviesWithDetails, setMoviesWithDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Memoize the filtered watchlist to prevent unnecessary re-renders
  const filteredWatchlist = React.useMemo(() => {
    return statusFilter === "all" 
      ? watchlist 
      : watchlist.filter(item => item.status === statusFilter);
  }, [watchlist, statusFilter]);

  // Fetch movie details for each watchlist item
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (filteredWatchlist.length === 0) {
        setMoviesWithDetails([]);
        return;
      }

      setLoading(true);
      try {
        const moviePromises = filteredWatchlist.map(async (item) => {
          try {
            const movieDetails = await getMovieById(item.imdbID);
            return {
              ...item,
              movieDetails: movieDetails
            };
          } catch (error) {
            console.error(`Error fetching details for ${item.imdbID}:`, error);
            return {
              ...item,
              movieDetails: null
            };
          }
        });

        const moviesWithDetails = await Promise.all(moviePromises);
        setMoviesWithDetails(moviesWithDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [filteredWatchlist]); // Now this only changes when filteredWatchlist actually changes

  const getStatusColor = (status) => {
    switch (status) {
      case "watched": return "bg-green-600/20";
      case "watching": return "bg-blue-600/20";
      case "to_watch": return "bg-yellow-600/20";
      default: return "bg-gray-600";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "watched": return "text-green-600";
      case "watching": return "text-blue-600";
      case "to_watch": return "text-yellow-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case "watched": return "border-green-600/10";
      case "watching": return "border-blue-600/10";
      case "to_watch": return "border-yellow-600/10";
      default: return "bg-gray-600";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "watched": return "Watched";
      case "watching": return "Watching";
      case "to_watch": return "To Watch";
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Please login to view watchlist</h2>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-2xl text-white border-2 border-white rounded-md px-3 py-1 font-bold cursor-pointer hover:scale-105 transition duration-300"
            >
              &larr;
            </button>
            <h1 className="text-4xl font-bold">
              My <span className="text-gradient">Watchlist</span>
            </h1>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-[#b29af3]"
          >
            <option value="all">All Status</option>
            <option value="to_watch">To Watch</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner />
          </div>
        ) : filteredWatchlist.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl font-medium text-gray-400 mb-4">
              {watchlist.length === 0 ? "Your watchlist is empty. Add some movies!" : "No movies match the selected filter."}
            </p>
            {watchlist.length === 0 && (
              <button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-[#b29af3] to-[#8a66e5] text-white px-6 py-2 rounded-lg"
              >
                Browse Movies
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {moviesWithDetails.map((item) => {
              const movie = item.movieDetails;
              if (!movie) {
                return (
                  <div key={item.$id} className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-gray-400">Error loading movie details</p>
                    <p className="text-sm text-gray-500">ID: {item.imdbID}</p>
                  </div>
                );
              }

              return (
                <div key={item.$id} className="bg-gray-800/20 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/no-movie.png"}
                    alt={movie.Title}
                    className="w-full h-72 object-cover object-top"
                  />
                  <div className="p-4">
                    <h3 className="text-[16px] font-semibold text-white mb-2 line-clamp-2">
                      {movie.Title}
                    </h3>
                    <div className="space-y-2 text-gray-300 mb-4">
                      <div className="flex items-center justify-between text-[12px]">
                        <span>Year: {movie.Year}</span>
                        <div className="flex items-center gap-1">
                          <img src="/star.svg" alt="rating" className="w-4 h-4" />
                          <span>{movie.imdbRating || "N/A"}</span>
                        </div>
                      </div>
                      <p className="text-[12px]">Language: {movie.Language ? movie.Language.split(",")[0] : "Unknown"}</p>
                      
                      <div className="flex items-center gap-2 text-[12px]">
                        <span>Status:</span>
                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.$id, e.target.value)}
                          className={`${getStatusColor(item.status)} ${getStatusTextColor(item.status)} ${getStatusBorderColor(item.status)} px-2 py-1 border rounded text-sm focus:outline-none text-[12px]`}
                        >
                          <option value="to_watch">To Watch</option>
                          <option value="watching">Watching</option>
                          <option value="watched">Watched</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => removeFromWatchlist(item.$id)}
                        className="flex-1 bg-purple-600/20 hover:bg-purple-700/20 border border-purple-600/10 text-purple-600 py-1.5 rounded-lg transition-colors duration-200 text-[14px]"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => navigate(`/movie/${item.imdbID}`)}
                        className="flex-1 bg-blue-600/20 hover:bg-blue-700/20 border border-blue-600/10  text-blue-600 py-1.5 rounded-lg transition-colors duration-200 text-[14px]"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Watchlist;