import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

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

interface MovieCardProps {
  movie: Movie;
  onRate: (rating: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onRate }) => {
  const averageRating = movie.ratings.length
    ? movie.ratings.reduce((acc, curr) => acc + curr.rating, 0) / movie.ratings.length
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={movie.poster_url || '/placeholder-movie.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {movie.release_year} • Directed by {movie.director}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.categories.map((category) => (
            <span
              key={category.id}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {category.name}
            </span>
          ))}
        </div>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {movie.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-700">{averageRating.toFixed(1)}</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onRate(rating)}
                className="p-1 hover:text-yellow-400 transition-colors"
              >
                <StarIcon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 