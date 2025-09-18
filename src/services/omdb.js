
const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query) {
    const res = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    return res.json();
}

export async function getMovieById(imdbID){
    const res = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
    return res.json();
}

export async function getMoviesByIds(ids=[]){
    return Promise.all(ids.map(id => getMovieById(id)))
}