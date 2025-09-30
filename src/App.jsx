import React from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/Favorites";
import { WatchlistProvider } from "./context/WatchlistContext";

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <WatchlistProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </WatchlistProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;