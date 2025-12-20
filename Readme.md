
# Role-Based Access Control (RBAC) System Using JWT

## Overview

This project implements a **Role-Based Access Control (RBAC) system** using **JSON Web Tokens (JWT)**. The original implementation goal was a cybersecurity mini project demonstrating secure authentication and authorization patterns.

The current implementation uses a modern React frontend with Tailwind CSS and a Node.js/Express backend. The app enforces roles so users see only the resources they are permitted to access.

---

## What's New

- Frontend reimplemented as a React application using Create React App / Vite and styled with Tailwind CSS.
- Improved UI with responsive, glassmorphism-style components (example: Login page uses backdrop blur and gradients).
- Routing handled with `react-router-dom` and protected routes implemented in the frontend to respect roles stored in JWTs.

---

## Objectives

* Implement secure user authentication using JWT
* Demonstrate role-based authorization (Admin, Manager, User)
* Prevent unauthorized access to protected resources
* Showcase modern frontend tooling (React + Tailwind)

---

## Key Features

* User registration and login (passwords hashed with bcrypt)
* JWT-based stateless authentication with expiry handling
* Role-based authorization enforced on protected routes
* Modern React frontend with Tailwind CSS (responsive and accessible)

---

## Technology Stack

### Frontend

* React
* Tailwind CSS
* Vite (or Create React App)
* react-router-dom

### Backend

* Node.js
* Express.js
* MongoDB (or any other supported DB)

### Security

* JSON Web Token (JWT)
* bcrypt (for password hashing)

---

## Roles and Permissions

| Role    | Permissions                          |
| ------- | ------------------------------------ |
| Admin   | Full access to all system resources  |
| Manager | Limited administrative access        |
| User    | Access to basic user-level resources |

---

## System Architecture

1. User logs in using valid credentials
2. Server verifies credentials and issues a JWT
3. JWT contains user identity and role
4. Client stores token (localStorage) and sends it with requests
5. Server validates token and role and returns resources or 401/403

---
```

---

## Installation and Setup

### Prerequisites

* Node.js (v16+ recommended)
* A running MongoDB instance or connection string

### Backend

```powershell
cd RBAC/backend
npm install
# create a .env with JWT_SECRET and MONGO_URI
npm start
```

### Frontend

```powershell
cd RBAC/frontend
npm install
npm run dev
```

If Tailwind is not initialized, run (from `frontend`):

```powershell
npx tailwindcss init -p
```

---

## Security Measures

* Password hashing using bcrypt
* JWT token expiration handling and validation
* Role-based access validation on protected routes
* Secure HTTP status responses (401, 403)

---

## Testing

* API endpoints can be tested with Postman or curl
* Frontend routes can be tested by running the dev server and exercising login/role flows

---

## Future Enhancements

* Multi-factor authentication (MFA)
* Token refresh mechanism and rotating refresh tokens
* OAuth integration
* Audit logging and monitoring
* Attribute-Based Access Control (ABAC)

---

## Author

**Nitesh Kumar Singh**
Cybersecurity Mini Project

