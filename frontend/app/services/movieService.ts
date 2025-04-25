import { Movie, Category } from '../types/movie';

import { apiEndpoints } from '../constants/apiEndpoints';

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch(apiEndpoints.movies);
  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(apiEndpoints.categories);
  return response.json();
}

export async function rateMovie(movieId: number, rating: number, userId: string): Promise<void> {
  await fetch(apiEndpoints.movieRating(movieId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating, user_id: userId }),
  });
}

export async function fetchRecommendations(movieId: number): Promise<Movie[]> {
  const response = await fetch(apiEndpoints.movieRecommendations(movieId));
  return response.json();
}
