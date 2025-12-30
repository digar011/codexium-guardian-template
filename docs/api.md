# API Documentation

## Overview
Codexium V4 interacts with external APIs for its AI capabilities. This document outlines the API endpoints and their usage.

### OpenAI Integration

#### Endpoint: `/generate-code`
- **Method**: POST
- **Description**: Generates code based on provided specifications and context.
- **Request Body**:
  - `requirements`: Detailed requirements for the code generation.
  - `context`: Contextual information to guide the AI.
- **Response**:
  - `files`: List of generated files with paths and content.

#### Error Handling
- API responses include error messages and status codes to guide troubleshooting.

### Authentication
- API requests require authentication via JWT tokens. Ensure `JWT_SECRET` is set appropriately in the environment configuration.