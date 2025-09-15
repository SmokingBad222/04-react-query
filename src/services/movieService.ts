import axios from "axios";
import type { Movie } from "../types/movie";
console.log("here");

const API_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_TOKEN;
console.log("orhere");

if (!token) {
  throw new Error("VITE_TMDB_TOKEN is not defined in your .env file");
}


const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export interface MoviesResponse {
  page: number;
  total_pages: number;
  results: Movie[];
}


export async function fetchMovies(query: string, page = 1): Promise<MoviesResponse> {
  if (!query.trim()) {
    return { page: 1, total_pages: 0, results: [] };
  }

  const { data } = await api.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });

  if (!data || !Array.isArray(data.results)) {
    throw new Error("Invalid API response");
  }

  return data;
}


 
export function buildImageUrl(path: string, size: string = "w500") {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
