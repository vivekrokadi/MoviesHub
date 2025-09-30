import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addFavorite as addFavoriteService,
  getFavorites,
  removeFavorite as removeFavoriteService,
} from "../appwrite/FavoritesService";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        return;
      }
      try {
        const docs = await getFavorites(user.$id);
        setFavorites(docs); 
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [user]);

  const addToFavorites = async (movie, userID) => {
    try {
      const newDoc = await addFavoriteService(movie, userID);
      setFavorites((prev) => [...prev, newDoc]);
    } catch (err) {
      console.error("Error adding to favorites:", err);
      throw err;
    }
  };

  const removeFromFavorites = async (docId) => {
    try {
      await removeFavoriteService(docId);
      setFavorites((prev) => prev.filter((f) => f.$id !== docId));
    } catch (err) {
      console.error("Error removing favorite:", err);
      throw err;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);