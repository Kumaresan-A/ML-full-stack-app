from pydantic import BaseModel
from typing import Optional

class MovieBase(BaseModel):
    title: str
    description: str
    release_year: int
    director: str
    category: str
    image_url: Optional[str] = None

class MovieCreate(MovieBase):
    pass

class Movie(MovieBase):
    id: int
    rating: float

    class Config:
        from_attributes = True 