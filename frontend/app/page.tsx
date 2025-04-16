'use client';

import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

interface Movie {
  id: number;
  title: string;
  release_year: number;
  director: string;
  description: string;
  poster_url: string;
  categories: { id: number; name: string }[];
  ratings: { rating: number }[];
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetchMovies();
    fetchCategories();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:8000/movies/');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/categories/');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleRating = async (movieId: number, rating: number) => {
    try {
      await fetch(`http://localhost:8000/movies/${movieId}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          user_id: 'temp-user', // Replace with actual user ID when auth is implemented
        }),
      });

      // Fetch recommendations after rating
      const recommendationsResponse = await fetch(
        `http://localhost:8000/movies/${movieId}/recommendations`
      );
      const recommendationsData = await recommendationsResponse.json();
      setRecommendations(recommendationsData);

      // Refresh movies to update ratings
      fetchMovies();
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const filteredMovies = selectedCategory === 'all'
    ? movies
    : movies.filter(movie =>
        movie.categories.some(category => category.name === selectedCategory)
      );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Movie Recommendations</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRate={(rating) => handleRating(movie.id, rating)}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">All Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRate={(rating) => handleRating(movie.id, rating)}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 