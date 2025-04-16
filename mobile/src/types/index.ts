export interface Movie {
  id: number;
  title: string;
  release_year: number;
  director: string;
  description: string;
  poster_url: string;
  categories: Category[];
  ratings: Rating[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Rating {
  id: number;
  rating: number;
  movie_id: number;
  user_id: string;
  timestamp: string;
}

export interface UserHistory {
  id: number;
  user_id: string;
  movie_id: number;
  timestamp: string;
}

export interface RootStackParamList {
  Home: undefined;
  MovieDetail: { movieId: number };
  CategoryMovies: { categoryName: string };
  Recommendations: undefined;
  Profile: undefined;
} 