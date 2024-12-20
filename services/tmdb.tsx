import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint: string) => {
    const { data } = await axios.get(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    return data;
};