import { useContext, createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


const FavoritesContext = createContext();

export function FavoritesProvider({ children}) {
    const [favorites, setFavorites] = useLocalStorage('favorites',[]);
    const addFavorite = (movie) => {
        if (!favorites.find((f) => f.imdbID === movie.imdbID)){
            setFavorites([...favorites, movie]);
        }
    }

    const removeFavorite = (id) => {
        setFavorites(favorites.filter((m) => m.imdbID !== id))
    };

    return (
        <FavoritesContext.Provider value={ { favorites, addFavorite, removeFavorite } }>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    return useContext(FavoritesContext)
}