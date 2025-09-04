# Agent Guidelines for Fitszy Project

## Build/Lint/Test Commands
- **Frontend (React/Vite)**: `cd frontend-client && npm run dev` (dev), `npm run build` (build), `npm run lint` (lint), `npm run preview` (preview)
- **Backend (Node.js/Express)**: `cd backend-api && node index.js` (start server)
- **Single test**: No test framework configured - add Jest/Mocha if needed

## Code Style Guidelines

### Frontend (React)
- **Components**: Functional components with hooks (useState, useEffect)
- **Imports**: ES6 imports, group by React, then third-party, then local
- **Styling**: Tailwind CSS with DaisyUI components, data-theme="night"
- **Naming**: PascalCase for components, camelCase for variables/functions
- **JSX**: Multi-line props, self-closing tags when no children
- **State**: useState for local state, Redux Toolkit available but commented out

### Backend (Node.js)
- **Modules**: CommonJS (require/module.exports)
- **Structure**: MVC pattern with controllers, models, services
- **Error Handling**: Try-catch blocks, next(error) for middleware
- **Validation**: Basic input validation, password length >= 6 chars
- **Database**: MongoDB with Mongoose, populate relationships
- **Auth**: JWT tokens, bcrypt for password hashing

### General
- **Linting**: ESLint with React hooks and refresh plugins
- **Formatting**: 2-space indentation, single quotes for strings
- **Comments**: Minimal comments, self-documenting code preferred
- **Security**: Never log secrets, use environment variables
- **File Uploads**: Multer for handling, S3 for storage

### Commit Message Style
- Use imperative mood: "Add feature" not "Added feature"
- Keep under 50 chars, reference issues when applicable