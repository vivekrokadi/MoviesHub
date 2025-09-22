import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { addFavorite, getFavorites, removeFavorite } from "../appwrite/FavoritesService";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      getFavorites(user.$id).then(setFavorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addToFavorites = async (movie) => {
    if (!user) return;
    const newFav = await addFavorite(movie, user.$id);
    setFavorites((prev) => [...prev, newFav]);
  };

  const removeFromFavorites = async (docId) => {
    await removeFavorite(docId);
    setFavorites((prev) => prev.filter((fav) => fav.$id !== docId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
