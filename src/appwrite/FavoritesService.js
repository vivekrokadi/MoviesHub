import { Client, Databases, ID, Query  } from "appwrite";
import {DATABASE_ID, FAVORITES_ID} from "./appwriteConfig"

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 

const databases = new Databases(client);

const DB_ID = DATABASE_ID;
const COLLECTION_ID = FAVORITES_ID;

export async function addFavorite(movie, userID) {
  try {
    const doc = {
      title: movie.Title,              
      year: movie.Year,
      poster: movie.Poster,
      rating: movie.imdbRating,
      language: movie.Language,
      imdbID: movie.imdbID,
      userID: userID,                 
    };

    const response = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      doc
    );

    return response;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
}

export async function removeFavorite(favoriteId) {
  try {
    await databases.deleteDocument(DB_ID, COLLECTION_ID, favoriteId);
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
}

export async function getFavorites(userID) {
  try {
    const response = await databases.listDocuments(DB_ID, COLLECTION_ID, [
      Query.equal("userID", userID),
    ]);
    return response.documents;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
}