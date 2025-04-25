export interface Category {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  release_year: number;
  director: string;
  description: string;
  poster_url: string;
  categories: Category[];
  ratings: { rating: number }[];
}
