import axios from "axios";
import type { Movie } from "../types/movie";

interface SearchMoviesResponse {
  results: Movie[];
}

const API_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_TOKEN;

if (!token) {
  throw new Error("VITE_TMDB_TOKEN is not defined in your .env file");
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/**
 * Виконує пошук фільмів за ключовим словом.
 * @param query Рядок пошукового запиту
 * @returns Проміс з масивом Movie[]
 */
export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const res = await api.get<SearchMoviesResponse>("/search/movie", {
    params: { query },
  });

  if (!res.data || !Array.isArray(res.data.results)) {
    throw new Error("Invalid API response");
  }

  return res.data.results;
}

/**
 * Створює повний URL для зображення TMDB
 * @param path шлях до зображення з API
 * @param size розмір (за замовчуванням "w500")
 * @returns повний URL рядка
 */
export function buildImageUrl(path: string, size: string = "w500") {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
