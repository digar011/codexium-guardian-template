# Deployment Guide

This guide will help you deploy the application to a production environment.

## Prerequisites
- Node.js and npm installed
- Environment configured with JWT_SECRET

## Deployment Steps
1. Build the application for production: `npm run build`
2. Serve the build directory using a web server of your choice (e.g., Nginx, Apache)
3. Ensure the server has access to the environment variables defined in the `.env` file
4. Configure server settings as needed for your specific environment
5. Monitor server logs to ensure the application is running smoothly