# System Design

This document provides an overview of the system architecture.

## Overview
The system is designed as a single-page application (SPA) using React for the front end. It leverages JWT for user authentication and authorization.

## Components
- **Login Component**: Handles user input and authentication process.
- **API Layer**: Manages communication with the backend server using RESTful endpoints.

## Authentication Flow
1. User submits credentials via the login form.
2. Credentials are validated in the frontend.
3. Upon successful validation, a JWT is obtained from the server.
4. The JWT is stored securely and used for subsequent API requests.