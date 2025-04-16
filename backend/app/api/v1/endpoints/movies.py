from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.movie import Movie, MovieCreate
from app.schemas.rating import Rating, RatingCreate
from app.services.movie_service import MovieService
from app.services.recommendation_service import RecommendationService

router = APIRouter()

@router.get("/", response_model=List[Movie])
def get_movies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return MovieService.get_movies(db, skip=skip, limit=limit)

@router.get("/{movie_id}", response_model=Movie)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = MovieService.get_movie(db, movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@router.post("/", response_model=Movie)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    return MovieService.create_movie(db, movie)

@router.get("/category/{category}", response_model=List[Movie])
def get_movies_by_category(category: str, db: Session = Depends(get_db)):
    return MovieService.get_movies_by_category(db, category)

@router.get("/{movie_id}/recommendations", response_model=List[Movie])
def get_recommendations(movie_id: int, db: Session = Depends(get_db)):
    movie = MovieService.get_movie(db, movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    recommender = RecommendationService(db)
    return recommender.get_recommendations(movie_id)

@router.post("/{movie_id}/rating", response_model=Rating)
def rate_movie(movie_id: int, rating: RatingCreate, db: Session = Depends(get_db)):
    movie = MovieService.get_movie(db, movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    db_rating = Rating(**rating.model_dump(), movie_id=movie_id)
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)
    return db_rating 

from fastapi import APIRouter
from app.services.recommendation_service import RecommendationService

router = APIRouter()

@router.get("/movies/")
def get_movies():
    recommendation_service = RecommendationService()
    ratings = [
        Rating(1, 1, 5),
        Rating(1, 2, 4),
        Rating(2, 1, 3),
        Rating(2, 2, 5)
    ]
    for rating in ratings:
        recommendation_service.add_rating(rating)
    recommended_movies = recommendation_service.get_recommendations(1)
    return {"recommended_movies": recommended_movies}