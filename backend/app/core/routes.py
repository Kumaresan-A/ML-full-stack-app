"""
Centralized route constants for FastAPI application.
Group as PUBLIC_ROUTES and PRIVATE_ROUTES.
"""

# Public API routes
PUBLIC_ROUTES = {
    "movies": "/api/v1/movies",
    "movie_detail": "/api/v1/movies/{movie_id}",
    "movie_category": "/api/v1/movies/category/{category}",
    "recommendations": "/api/v1/movies/{movie_id}/recommendations",
}

# Private API routes (add as needed)
PRIVATE_ROUTES = {
    # Example: "admin_dashboard": "/api/v1/admin/dashboard",
}
