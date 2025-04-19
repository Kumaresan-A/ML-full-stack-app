# ML Full Stack Application

A comprehensive full-stack application with web frontend, backend API, and mobile application.

## Project Structure

```
ml-full-stack-app/
├── backend/         # Python backend application
├── frontend/       # Web frontend application
└── mobile/         # Mobile application
```

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start development server:
   ```bash
   uvicorn app.main:app --reload
   ```

#### Database Migrations (Alembic)

**Initialize Alembic (only once per project):**
```bash
alembic init alembic
```
This creates the Alembic migration environment.

**Configure Alembic:**
- Edit `alembic.ini` to set your database URL.
- Ensure `target_metadata = Base.metadata` in `alembic/env.py` and import all models.

**Create a new migration (after changing models):**
```bash
alembic revision --autogenerate -m "create ratings table"
```
This generates a migration script reflecting model changes.

**Apply migrations to update the database:**
```bash
alembic upgrade head
```
This applies all pending migrations, creating/updating tables as needed.

**Development:**
- Run `alembic revision --autogenerate -m "<message>"` and `alembic upgrade head` whenever you change models.

**Production:**
- Review generated migration scripts before applying.
- Use `alembic upgrade head` as part of your deployment process to ensure the production DB schema is up-to-date.


### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```

### Mobile Setup
1. Navigate to mobile directory:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```

## Development Guidelines

1. Always work on feature branches
2. Follow the conventional commit format
3. Update documentation as needed
4. Write tests for new features

## Git Large File Storage (LFS)

For large binary files, we use Git LFS. To work with this repository:

1. Install Git LFS:
   ```bash
   git lfs install
   ```
2. Large binary files are automatically tracked based on .gitattributes

## Environment Variables

Each component (backend, frontend, mobile) has its own environment variables:
- Copy `.env.example` to `.env` in each directory
- Update the values as per your local setup

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
4. Wait for review and approval

## License

[Your License Here]
