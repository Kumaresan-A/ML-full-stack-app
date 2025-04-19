from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.schemas.movie import Movie, MovieCreate
from app.schemas.rating import Rating as RatingSchema, RatingCreate
from app.models.rating import Rating as RatingModel
from app.services.movie_service import MovieService
from app.services.recommendation_service import RecommendationService

router = APIRouter()

@router.get("/", response_model=List[Movie])
async def get_movies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        return MovieService.get_movies(db, skip=skip, limit=limit)
    except Exception as e:
        # Log the error, and return a detailed error message for debugging
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{movie_id}", response_model=Movie)
async def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = MovieService.get_movie(db, movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@router.post("/", response_model=Movie)
async def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    return MovieService.create_movie(db, movie)

@router.get("/category/{category}", response_model=List[Movie])
async def get_movies_by_category(category: str, db: Session = Depends(get_db)):
    return MovieService.get_movies_by_category(db, category)

@router.get("/{movie_id}/recommendations", response_model=List[Movie])
async def get_recommendations(movie_id: int, db: Session = Depends(get_db)):
    movie = MovieService.get_movie(db, movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    recommender = RecommendationService(db)
    return recommender.get_recommendations(movie_id)

from app.models.rating import Rating as RatingModel
from app.schemas.rating import Rating as RatingSchema

@router.post("/{movie_id}/rating", response_model=RatingSchema)
async def rate_movie(movie_id: int, rating: RatingCreate, db: Session = Depends(get_db)):
    try:
        movie = MovieService.get_movie(db, movie_id)
        if movie is None:
            raise HTTPException(status_code=404, detail="Movie not found")
        
        db_rating = RatingModel(**rating.model_dump(), movie_id=movie_id)
        db.add(db_rating)
        db.commit()
        db.refresh(db_rating)
        return RatingSchema.model_validate(db_rating)
    except Exception as e:
        import traceback
        print("ERROR in rate_movie:", e)
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})


# Demo/test code for recommendations (not exposed as a route):
async def demo_recommendations():
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
# To use this function for testing, call demo_recommendations() in your code or tests.