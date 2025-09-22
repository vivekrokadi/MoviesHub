import { Client, Databases, Account} from "appwrite";


const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 
export const account = new Account(client);
export const databases = new Databases(client);


export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID; 
export const FAVORITES_ID = import.meta.env.VITE_APPWRITE_FAVORITES_ID;
; 
export const WATCHLIST_ID = import.meta.env.VITE_APPWRITE_WATCHLIST_ID; 

export default client;