import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addToWatchlist as addToWatchlistService,
  getWatchlist,
  removeFromWatchlist as removeFromWatchlistService,
  updateWatchlistStatus,
} from "../appwrite/WatchlistService";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) {
        setWatchlist([]);
        return;
      }
      try {
        const docs = await getWatchlist(user.$id);
        setWatchlist(docs);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      }
    };

    fetchWatchlist();
  }, [user]);

  const addToWatchlist = async (movie, status = "to_watch") => {
    try {
      const newDoc = await addToWatchlistService(movie, user.$id, status);
      setWatchlist((prev) => [...prev, newDoc]);
      return newDoc;
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      throw err;
    }
  };

  const removeFromWatchlist = async (docId) => {
    try {
      await removeFromWatchlistService(docId);
      setWatchlist((prev) => prev.filter((item) => item.$id !== docId));
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      throw err;
    }
  };

  const updateStatus = async (docId, status) => {
    try {
      const updatedDoc = await updateWatchlistStatus(docId, status);
      setWatchlist((prev) =>
        prev.map((item) => (item.$id === docId ? updatedDoc : item))
      );
    } catch (err) {
      console.error("Error updating watchlist status:", err);
      throw err;
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        updateStatus,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);