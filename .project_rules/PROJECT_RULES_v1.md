# Project Rules (Version 1)

This file contains all project rules and conventions as taught by the team. Update or increment the version as new rules are added or existing rules are changed.

---

## 1. API Endpoint Consistency Rule
Whenever an API endpoint is added or modified in the frontend file `frontend/app/constants/apiEndpoints.ts`,
you must verify that the endpoint matches (or is consistent with) the corresponding route defined in the backend file `backend/app/core/routes.py`.
- If there is any mismatch or a new endpoint that does not exist in the backend, notify the team and suggest corrections or clarifications.

---

*To update these rules, increment the version number in the filename and document the changes below.*
