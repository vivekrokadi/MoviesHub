import { Client, Databases, ID, Query } from "appwrite";
import { DATABASE_ID, WATCHLIST_ID } from "./appwriteConfig";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DB_ID = DATABASE_ID;
const COLLECTION_ID = WATCHLIST_ID;

export async function addToWatchlist(movie, userID, status = "to_watch") {
  try {
    const doc = {
      userID: userID,
      imdbID: movie.imdbID || movie.imdbid || "",
      status: status,
      // Add these when you create the attributes in Appwrite
      title: movie.Title || movie.title || "Unknown Title",
      year: movie.Year || movie.year || "Unknown Year",
      poster: movie.Poster || movie.poster || "/no-movie.png",
      rating: movie.imdbRating || movie.rating || "N/A",
      language: movie.Language || movie.language || "Unknown",
    };

    console.log("Creating watchlist document:", doc);

    const response = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      doc
    );

    return response;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
}

export async function removeFromWatchlist(watchlistId) {
  try {
    await databases.deleteDocument(DB_ID, COLLECTION_ID, watchlistId);
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
}

export async function updateWatchlistStatus(watchlistId, status) {
  try {
    const response = await databases.updateDocument(
      DB_ID,
      COLLECTION_ID,
      watchlistId,
      { status }
    );
    return response;
  } catch (error) {
    console.error("Error updating watchlist status:", error);
    throw error;
  }
}

export async function getWatchlist(userID, statusFilter = null) {
  try {
    let queries = [Query.equal("userID", userID)];
    
    if (statusFilter && statusFilter !== "all") {
      queries.push(Query.equal("status", statusFilter));
    }

    const response = await databases.listDocuments(DB_ID, COLLECTION_ID, queries);
    return response.documents;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
}