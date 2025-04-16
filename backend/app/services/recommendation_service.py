from sqlalchemy.orm import Session
from app.models.movie import Movie
from app.models.rating import Rating
from typing import List
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

class RecommendationService:
    def __init__(self, db: Session):
        self.db = db

    def get_recommendations(self, movie_id: int, limit: int = 5) -> List[Movie]:
        # Get all ratings
        ratings = self.db.query(Rating).all()
        
        # Create user-movie matrix
        ratings_data = []
        for rating in ratings:
            ratings_data.append({
                'user_id': rating.user_id,
                'movie_id': rating.movie_id,
                'rating': rating.rating
            })
        
        if not ratings_data:
            # If no ratings, return movies from same category
            movie = self.db.query(Movie).filter(Movie.id == movie_id).first()
            return self.db.query(Movie).filter(
                Movie.category == movie.category,
                Movie.id != movie_id
            ).limit(limit).all()
        
        df = pd.DataFrame(ratings_data)
        user_movie_matrix = df.pivot(
            index='user_id',
            columns='movie_id',
            values='rating'
        ).fillna(0)
        
        # Calculate movie similarity
        movie_similarity = cosine_similarity(user_movie_matrix.T)
        movie_similarity_df = pd.DataFrame(
            movie_similarity,
            index=user_movie_matrix.columns,
            columns=user_movie_matrix.columns
        )
        
        # Get similar movies
        similar_movies = movie_similarity_df[movie_id].sort_values(ascending=False)
        similar_movie_ids = similar_movies[1:limit+1].index.tolist()
        
        return self.db.query(Movie).filter(Movie.id.in_(similar_movie_ids)).all() 