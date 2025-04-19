from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    movie_id = Column(Integer, ForeignKey("movies.id"), index=True)
    rating = Column(Integer)

    # Optional relationship to Movie model
    # movie = relationship("Movie", back_populates="ratings")
    
    def __repr__(self):
        return f"Rating(user_id={self.user_id}, movie_id={self.movie_id}, rating={self.rating})"
