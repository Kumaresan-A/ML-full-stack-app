import axios from 'axios';
import { Movie, Category, Rating } from '../types';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const movieService = {
  getAllMovies: async (): Promise<Movie[]> => {
    try {
      const response = await api.get('/movies/');
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },

  getMovieById: async (movieId: number): Promise<Movie> => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie with ID ${movieId}:`, error);
      throw error;
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/categories/');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getRecommendations: async (movieId: number): Promise<Movie[]> => {
    try {
      const response = await api.get(`/movies/${movieId}/recommendations`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching recommendations for movie ${movieId}:`, error);
      throw error;
    }
  },

  rateMovie: async (movieId: number, rating: number, userId: string): Promise<Rating> => {
    try {
      const response = await api.post(`/movies/${movieId}/rating`, {
        rating,
        user_id: userId,
      });
      return response.data;
    } catch (error) {
      console.error(`Error rating movie ${movieId}:`, error);
      throw error;
    }
  },

  getUserHistory: async (userId: string): Promise<Movie[]> => {
    try {
      const response = await api.get(`/users/${userId}/history`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching history for user ${userId}:`, error);
      throw error;
    }
  },
}; 