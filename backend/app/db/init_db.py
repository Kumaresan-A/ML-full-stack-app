from sqlalchemy.orm import Session
from app.models.movie import Movie
from app.models.rating import Rating
from app.db.session import SessionLocal

# Sample movie data
sample_movies = [
    {
        "title": "The Shawshank Redemption",
        "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "release_year": 1994,
        "director": "Frank Darabont",
        "rating": 9.3,
        "category": "Drama",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
    },
    {
        "title": "The Godfather",
        "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        "release_year": 1972,
        "director": "Francis Ford Coppola",
        "rating": 9.2,
        "category": "Crime",
        "image_url": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
    },
    {
        "title": "The Dark Knight",
        "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "release_year": 2008,
        "director": "Christopher Nolan",
        "rating": 9.0,
        "category": "Action",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
    },
    {
        "title": "Pulp Fiction",
        "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "release_year": 1994,
        "director": "Quentin Tarantino",
        "rating": 8.9,
        "category": "Crime",
        "image_url": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
    },
    {
        "title": "Inception",
        "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        "release_year": 2010,
        "director": "Christopher Nolan",
        "rating": 8.8,
        "category": "Sci-Fi",
        "image_url": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
    },
]

# Sample ratings
sample_ratings = [
    {"user_id": 1, "movie_id": 1, "rating": 5},
    {"user_id": 1, "movie_id": 2, "rating": 4},
    {"user_id": 1, "movie_id": 3, "rating": 5},
    {"user_id": 2, "movie_id": 1, "rating": 4},
    {"user_id": 2, "movie_id": 4, "rating": 5},
    {"user_id": 3, "movie_id": 2, "rating": 5},
    {"user_id": 3, "movie_id": 3, "rating": 4},
    {"user_id": 3, "movie_id": 5, "rating": 5},
]

def init_db():
    db = SessionLocal()
    
    try:
        # Check if we already have movies
        existing_movies = db.query(Movie).count()
        if existing_movies == 0:
            # Add sample movies
            for movie_data in sample_movies:
                db_movie = Movie(**movie_data)
                db.add(db_movie)
            
            db.commit()
            
            # Now add ratings
            for rating_data in sample_ratings:
                db_rating = Rating(**rating_data)
                db.add(db_rating)
            
            db.commit()
            print("Database initialized with sample data")
        else:
            print("Database already contains data, skipping initialization")
    
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

# Run this script directly to initialize the database
if __name__ == "__main__":
    init_db()
