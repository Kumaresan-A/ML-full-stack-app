from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints import movies
from app.db.base import Base
from app.db.session import engine
from app.db.init_db import init_db

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize database with sample data
init_db()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to my FastAPI application"}


# Include routers
app.include_router(movies.router, prefix=f"{settings.API_V1_STR}/movies", tags=["movies"])
