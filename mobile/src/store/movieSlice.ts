import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieService } from '../services/api';
import { Movie, Category } from '../types';

interface MovieState {
  movies: Movie[];
  categories: Category[];
  recommendations: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  categories: [],
  recommendations: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      return await movieService.getAllMovies();
    } catch (error) {
      return rejectWithValue('Failed to fetch movies');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'movies/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await movieService.getCategories();
    } catch (error) {
      return rejectWithValue('Failed to fetch categories');
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId: number, { rejectWithValue }) => {
    try {
      return await movieService.getMovieById(movieId);
    } catch (error) {
      return rejectWithValue('Failed to fetch movie details');
    }
  }
);

export const fetchRecommendations = createAsyncThunk(
  'movies/fetchRecommendations',
  async (movieId: number, { rejectWithValue }) => {
    try {
      return await movieService.getRecommendations(movieId);
    } catch (error) {
      return rejectWithValue('Failed to fetch recommendations');
    }
  }
);

export const rateMovie = createAsyncThunk(
  'movies/rateMovie',
  async ({ movieId, rating, userId }: { movieId: number; rating: number; userId: string }, { rejectWithValue }) => {
    try {
      await movieService.rateMovie(movieId, rating, userId);
      return { movieId, rating };
    } catch (error) {
      return rejectWithValue('Failed to rate movie');
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Recommendations
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Rate Movie
      .addCase(rateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rateMovie.fulfilled, (state, action) => {
        state.loading = false;
        // Update the movie's ratings in the state
        const { movieId, rating } = action.payload;
        const movieIndex = state.movies.findIndex(movie => movie.id === movieId);
        if (movieIndex !== -1) {
          state.movies[movieIndex].ratings.push({
            id: Date.now(), // Temporary ID
            rating,
            movie_id: movieId,
            user_id: 'temp-user', // This should be replaced with actual user ID
            timestamp: new Date().toISOString(),
          });
        }
      })
      .addCase(rateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedMovie, clearRecommendations } = movieSlice.actions;
export default movieSlice.reducer; 