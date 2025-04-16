from typing import Optional
 
class Rating:
     def __init__(self, user_id: int, movie_id: int, rating: int):
         self.user_id = user_id
         self.movie_id = movie_id
         self.rating = rating
 
     def __repr__(self):
         return f"Rating(user_id={self.user_id}, movie_id={self.movie_id}, rating={self.rating})"
