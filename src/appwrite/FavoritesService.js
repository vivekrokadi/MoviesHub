import { databases, DATABASE_ID, FAVORITES_ID } from "./appwriteConfig";
import { ID, Query } from "appwrite";

export const addFavorite = async (movie, userID) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      FAVORITES_ID,
      ID.unique(),
      {
        imdbID: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year,
        rating: movie.imdbRating,
        language: movie.Language,
        userID,
      }
    );
  } catch (err) {
    console.error("Error adding favorite:", err);
    throw err;
  }
};

export const getFavorites = async (userId) => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, FAVORITES_ID, [
      Query.equal("userID", userID),
    ]);
    return res.documents;
  } catch (err) {
    console.error("Error fetching favorites:", err);
    return [];
  }
};


export const removeFavorite = async (docId) => {
  try {
    await databases.deleteDocument(DATABASE_ID, FAVORITES_ID, docId);
  } catch (err) {
    console.error("Error removing favorite:", err);
    throw err;
  }
};
