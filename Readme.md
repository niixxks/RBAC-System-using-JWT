
# Role-Based Access Control (RBAC) System Using JWT

## Overview

This project implements a **Role-Based Access Control (RBAC) system** using **JSON Web Tokens (JWT)** as part of a cybersecurity mini project. The system demonstrates secure authentication and authorization mechanisms commonly used in real-world web applications.

The application ensures that users can only access resources permitted by their assigned roles, thereby enforcing the **principle of least privilege**.

---

## Objectives

* To implement secure user authentication using JWT
* To demonstrate role-based authorization
* To prevent unauthorized access to protected resources
* To understand real-world access control mechanisms used in cybersecurity

---

## Key Features

* User registration and login
* Password hashing for secure credential storage
* JWT-based stateless authentication
* Role-based authorization (Admin, Manager, User)
* Protected backend routes
* Secure access denial using HTTP status codes

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Security

* JSON Web Token (JWT)
* bcrypt (for password hashing)

### Database

* MongoDB

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
4. Client sends JWT with each request
5. Server validates token and role
6. Access is granted or denied based on role

---

## Project Structure

```
rbac-jwt-project/
│
├── frontend/
│   ├── login.html
│   ├── dashboard.html
│   ├── admin.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── protectedRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── .env
│
└── README.md
```

---

## Installation and Setup

### Prerequisites

* Node.js installed
* MongoDB running locally or on cloud
* Basic knowledge of REST APIs

### Backend Setup

1. Navigate to backend directory
2. Install dependencies

   ```
   npm install
   ```
3. Create `.env` file and configure:

   ```
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongodb_connection
   ```
4. Start the server

   ```
   npm start
   ```

---

## Security Measures Implemented

* Password hashing using bcrypt
* JWT token expiration handling
* Role-based access validation
* Secure HTTP status responses (401, 403)
* Stateless authentication without server-side sessions

---

## Testing

* APIs tested using Postman
* Role-based access verified for all routes
* Invalid and expired tokens handled securely

---

## Expected Outcomes

* Secure authentication system
* Proper role enforcement
* Unauthorized users are restricted
* Demonstrates real-world cybersecurity practices

---

## Future Enhancements

* Multi-factor authentication (MFA)
* Token refresh mechanism
* OAuth integration
* Audit logging and monitoring
* Attribute-Based Access Control (ABAC)

---

## Conclusion

This project successfully demonstrates the implementation of **Role-Based Access Control using JWT**, providing a secure and scalable authorization mechanism suitable for modern web applications and cybersecurity use cases.

---

## Author

**Nitesh Kumar Singh**
Cybersecurity Mini Project
