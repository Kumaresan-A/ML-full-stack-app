from sqlalchemy import Column, Integer, String, Float, Text
from app.db.base import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    release_year = Column(Integer)
    director = Column(String)
    rating = Column(Float, default=0.0)
    category = Column(String)
    image_url = Column(String, nullable=True) 