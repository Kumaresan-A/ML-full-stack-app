import { useState, useEffect } from 'react';
import { Movie, Category } from '../types/movie';
import { fetchMovies, fetchCategories, rateMovie, fetchRecommendations } from '../services/movieService';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchMovies().then(setMovies);
    fetchCategories().then(setCategories);
  }, []);

  const handleRating = async (movieId: number, rating: number) => {
    await rateMovie(movieId, rating, 'temp-user'); // Replace with real user ID
    const recommendationsData = await fetchRecommendations(movieId);
    setRecommendations(recommendationsData);
    fetchMovies().then(setMovies);
  };

  const filteredMovies = selectedCategory === 'all'
    ? movies
    : movies.filter(movie =>
        movie.categories.some(category => category.name === selectedCategory)
      );

  return {
    movies: filteredMovies,
    recommendations,
    categories,
    selectedCategory,
    setSelectedCategory,
    handleRating,
  };
}
