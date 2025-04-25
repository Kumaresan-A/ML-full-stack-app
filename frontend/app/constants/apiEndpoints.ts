// Centralized API endpoint constants for the frontend

export const API_BASE = 'http://localhost:8000/api/v1';

export const apiEndpoints = {
  movies: `${API_BASE}/movies/`,
  categories: `${API_BASE}/categories/`,
  movieRating: (movieId: number) => `${API_BASE}/movies/${movieId}/rating`,
  movieRecommendations: (movieId: number) => `${API_BASE}/movies/${movieId}/recommendations`,
};
