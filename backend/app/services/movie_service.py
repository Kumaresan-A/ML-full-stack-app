from sqlalchemy.orm import Session
from app.models.movie import Movie
from app.schemas.movie import MovieCreate
from typing import List, Optional

class MovieService:
    @staticmethod
    def get_movies(db: Session, skip: int = 0, limit: int = 100) -> List[Movie]:
        return db.query(Movie).offset(skip).limit(limit).all()

    @staticmethod
    def get_movie(db: Session, movie_id: int) -> Optional[Movie]:
        return db.query(Movie).filter(Movie.id == movie_id).first()

    @staticmethod
    def create_movie(db: Session, movie: MovieCreate) -> Movie:
        db_movie = Movie(**movie.model_dump())
        db.add(db_movie)
        db.commit()
        db.refresh(db_movie)
        return db_movie

    @staticmethod
    def get_movies_by_category(db: Session, category: str) -> List[Movie]:
        return db.query(Movie).filter(Movie.category == category).all() 