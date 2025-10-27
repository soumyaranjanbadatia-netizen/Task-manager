# Copilot Instructions for MERN Codebase

## Project Overview
- **Architecture:** This is a full-stack MERN (MongoDB, Express, React, Node.js) monorepo with two main folders:
  - `Backend/`: Node.js/Express REST API for user authentication and profile management, using MongoDB via Mongoose.
  - `Frontend/`: React app (Vite-based) with Tailwind CSS and React Router.

## Key Workflows
- **Backend:**
  - Start: `npm start` (runs with `nodemon`)
  - Main entry: `server.js` (loads Express, connects MongoDB, mounts `/api/user` routes)
  - Environment: expects `.env` for secrets (e.g., `JWT_SECRET`, `PORT`)
  - MongoDB connection string is currently hardcoded in `config/db.js` (update for production!)
  - User routes: see `routes/userRoute.js` (register, login, profile, password)
  - Auth: JWT-based, middleware in `middleware/auth.js` (expects `Authorization: Bearer <token>` header)
  - User model: `models/userModels.js` (fields: name, email, password)

- **Frontend:**
  - Start dev server: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
  - Main entry: `src/App.jsx`
  - Uses React Router and Tailwind CSS (see `package.json`)

## Patterns & Conventions
- **Backend:**
  - Uses ES modules (`type: module` in `package.json`)
  - All API endpoints are under `/api/user` (see `userRoute.js`)
  - JWT secret fallback is insecure; always set `JWT_SECRET` in production
  - Passwords are hashed with bcrypt before storage
  - Error responses are JSON with `{ success, message }`
  - User update and password change require authentication

- **Frontend:**
  - React components in `src/`
  - Tailwind CSS for styling (see `index.css`)
  - No TypeScript by default

## Integration Points
- **Frontend <-> Backend:**
  - Frontend should call backend at `/api/user/*` endpoints
  - Authenticated requests must include JWT in `Authorization` header

## Examples
- Register: `POST /api/user/register` `{ name, email, password }`
- Login: `POST /api/user/login` `{ email, password }`
- Get profile: `GET /api/user/me` with `Authorization: Bearer <token>`

## Recommendations
- Move secrets and DB URIs to environment variables for security
- Add tests and error handling for production use
- Update README files in both `Backend/` and `Frontend/` for onboarding

---
_This file is auto-generated. Update as the project evolves._
