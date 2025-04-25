'use client';

import MovieCard from '../components/MovieCard';
import { useMovies } from './hooks/useMovies';
import { Movie } from './types/movie';

export default function Home() {
  const {
    movies,
    recommendations,
    categories,
    selectedCategory,
    setSelectedCategory,
    handleRating,
  } = useMovies();

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
          {movies.map((movie: Movie) => (
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