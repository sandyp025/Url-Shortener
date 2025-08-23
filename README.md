# Linklytics - Advanced URL Shortener


[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/style-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/container-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Netlify](https://img.shields.io/badge/deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Render](https://img.shields.io/badge/deployed%20on-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)


## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Technical Stack](#technical-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Deployment](#deployment)
- [Performance Considerations](#performance-considerations)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

Linklytics is a full-stack URL shortening service built with React and Spring Boot that provides secure URL shortening, comprehensive analytics, and user management capabilities. The application features JWT-based authentication, responsive design, and cloud-native deployment.

## Architecture

The application follows a modern microservices-inspired architecture with clear separation of concerns:

```
Client Layer (React) → API Gateway (Spring Boot) → Service Layer → Data Access Layer → PostgreSQL
```

**Key Architectural Decisions:**
- RESTful API design with stateless authentication
- Containerized backend deployment using Docker
- Cloud-hosted PostgreSQL database (NeonDB)
- CDN-based frontend deployment (Netlify)
- JWT-based session management

## Technical Stack

### Frontend
- **Framework**: React 18 with Vite build tool
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API + useReducer
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v6
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Vite with optimized configuration

### Backend
- **Framework**: Spring Boot 3.1 with Spring Security
- **Database**: PostgreSQL 14+ with NeonDB hosting
- **ORM**: Spring Data JPA with Hibernate
- **Authentication**: JWT with Spring Security
- **Validation**: Bean Validation 3.0
- **Containerization**: Docker with multi-stage builds
- **API Documentation**: Springdoc OpenAPI

### Infrastructure
- **Frontend Hosting**: Netlify (CDN global distribution)
- **Backend Hosting**: Render (Docker container deployment)
- **Database**: NeonDB (serverless PostgreSQL)
- **DNS**: Custom domain configuration

## Features

### Core Functionality
- URL shortening with custom alias support
- URL validation and sanitization
- HTTP redirect handling with 301/302 support
- Click analytics with temporal data
- User authentication and authorization

### Advanced Features
- JWT-based authentication with refresh tokens
- Rate limiting on URL creation endpoints
- Input validation and XSS protection
- CORS configuration for cross-origin requests
- Database connection pooling
- Query optimization with indexes

### Analytics Capabilities
- Total click counts per URL
- Time-series click data (daily, weekly, monthly)
- Geographic analytics (future implementation)
- Referrer tracking (future implementation)
- Device and browser analytics (future implementation)

## Project Structure

### Frontend Structure
```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Button, Input, Modal
│   │   ├── layout/       # Header, Footer, Navigation
│   │   └── analytics/    # Chart components
│   ├── pages/            # Route components
│   │   ├── Login.jsx     # Authentication page
│   │   ├── Dashboard.jsx # URL management
│   │   └── Analytics.jsx # Data visualization
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js    # Authentication logic
│   │   ├── useApi.js     # API calls abstraction
│   │   └── useLocalStorage.js # Persistent storage
│   ├── context/          # React Context providers
│   │   ├── AuthContext.js # Authentication state
│   │   └── AppContext.js  # Application state
│   ├── services/         # API service layer
│   │   ├── authService.js # Authentication API calls
│   │   └── urlService.js  # URL management API calls
│   ├── utils/            # Utility functions
│   │   ├── validators.js # Input validation
│   │   ├── formatters.js # Data formatting
│   │   └── constants.js  # Application constants
│   └── styles/           # Global styles and Tailwind config
```

### Backend Structure
```
src/main/java/com/urlshortener/
├── controller/            # REST API endpoints
│   ├── AuthController.java   # Authentication endpoints
│   ├── UrlController.java    # URL management endpoints
│   └── AnalyticsController.java # Data endpoints
├── service/               # Business logic layer
│   ├── impl/             # Service implementations
│   ├── AuthService.java      # Authentication logic
│   ├── UrlService.java       # URL shortening logic
│   └── AnalyticsService.java # Data processing
├── repository/            # Data access layer
│   ├── UserRepository.java   # User data operations
│   ├── UrlRepository.java    # URL data operations
│   └── ClickRepository.java  # Analytics data operations
├── model/                 # Data models
│   ├── User.java             # User entity
│   ├── Url.java             # URL entity
│   ├── Click.java           # Click tracking entity
│   └── dto/               # Data Transfer Objects
├── security/              # Security configuration
│   ├── JwtAuthenticationFilter.java # JWT processing
│   ├── JwtUtil.java           # JWT utilities
│   └── SecurityConfig.java    # Security configuration
├── exception/             # Exception handling
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   └── CustomValidationException.java
└── config/                # Application configuration
    ├── DatabaseConfig.java    # DB configuration
    ├── WebConfig.java         # Web MVC configuration
    └── CorsConfig.java        # CORS configuration
```

## Installation & Setup

### Prerequisites
- Node.js 18.0.0 or higher
- Java 17 or higher
- PostgreSQL 14 or higher (or NeonDB account)
- Docker and Docker Compose (optional)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sandyp025/Url-Shortener.git
   cd Url-Shortener
   ```

2. **Backend Configuration**
   ```bash
   # Configure application.properties
   cp src/main/resources/application.example.properties src/main/resources/application.properties
   
   # Edit with your database credentials
   nano src/main/resources/application.properties
   ```

3. **Database Setup**
   ```sql
   -- Create database and user
   CREATE DATABASE urlshortener;
   CREATE USER shortuser WITH PASSWORD 'yourpassword';
   GRANT ALL PRIVILEGES ON DATABASE urlshortener TO shortuser;
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure environment variables
   nano .env
   ```

5. **Run the Application**
   ```bash
   # Terminal 1: Backend
   ./mvnw spring-boot:run
   
   # Terminal 2: Frontend
   cd frontend
   npm run dev
   ```

### Docker Deployment

```bash
# Using Docker Compose for full stack
docker-compose -f docker-compose.yml up --build

# Backend only with Docker
docker build -t url-shortener-backend .
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/db \
  -e SPRING_DATASOURCE_USERNAME=user \
  -e SPRING_DATASOURCE_PASSWORD=pass \
  url-shortener-backend
```

### Environment Variables

**Backend (.env or application.properties):**
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/urlshortener
spring.datasource.username=yourusername
spring.datasource.password=yourpassword

# JWT
jwt.secret=your-jwt-secret-key-minimum-256-bits
jwt.expiration=86400000

# Application
server.port=8080
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# CORS
cors.allowed-origins=http://localhost:3000,https://your-netlify-app.netlify.app
```

**Frontend (.env):**
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_APP_NAME=Linklytics
VITE_APP_VERSION=1.0.0
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Creates a new user account.

**Request:**
```json
{
  "username": "user@example.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "user@example.com",
  "createdAt": "2023-11-15T10:00:00.000Z"
}
```

#### POST /api/auth/login
Authenticates a user and returns JWT tokens.

**Request:**
```json
{
  "username": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400000
}
```

### URL Management Endpoints

#### POST /api/urls/shorten
Creates a shortened URL.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "originalUrl": "https://example.com/very/long/url/path",
  "customAlias": "optional-custom-alias"
}
```

**Response:**
```json
{
  "id": 1,
  "originalUrl": "https://example.com/very/long/url/path",
  "shortUrl": "https://short.domain/abc123",
  "shortCode": "abc123",
  "createdAt": "2023-11-15T10:00:00.000Z",
  "clickCount": 0
}
```

#### GET /api/urls/{shortCode}
Redirects to the original URL.

#### GET /api/urls/user/{userId}
Retrieves all URLs for a specific user.

#### DELETE /api/urls/{urlId}
Deletes a shortened URL.

### Analytics Endpoints

#### GET /api/analytics/url/{urlId}
Retrieves analytics for a specific URL.

**Response:**
```json
{
  "urlId": 1,
  "totalClicks": 150,
  "clicksByDate": [
    {"date": "2023-11-15", "count": 25},
    {"date": "2023-11-16", "count": 30}
  ],
  "clicksByCountry": [
    {"country": "US", "count": 100},
    {"country": "UK", "count": 50}
  ]
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### URLs Table
```sql
CREATE TABLE urls (
    id BIGSERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    user_id BIGINT REFERENCES users(id),
    click_count BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL
);

CREATE INDEX idx_urls_short_code ON urls(short_code);
CREATE INDEX idx_urls_user_id ON urls(user_id);
```

### Clicks Table
```sql
CREATE TABLE clicks (
    id BIGSERIAL PRIMARY KEY,
    url_id BIGINT REFERENCES urls(id),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer TEXT,
    country_code VARCHAR(2)
);

CREATE INDEX idx_clicks_url_id ON clicks(url_id);
CREATE INDEX idx_clicks_clicked_at ON clicks(clicked_at);
```

## Authentication Flow

### JWT Implementation
The application uses JWT (JSON Web Tokens) for stateless authentication:

1. **Login**: User credentials are verified, JWT access and refresh tokens are issued
2. **Access Token**: Short-lived token (24 hours) for API authentication
3. **Refresh Token**: Long-lived token (7 days) for obtaining new access tokens
4. **Token Storage**: HTTP-only cookies for enhanced security
5. **Token Refresh**: Automatic token renewal using refresh tokens

### Security Measures
- Password hashing with BCrypt (cost factor 12)
- JWT signature with HMAC-SHA256 algorithm
- HTTPS enforcement in production
- CORS configuration for cross-origin requests
- XSS protection headers
- CSRF protection for state-changing operations

## Deployment

### Frontend Deployment (Netlify)

1. **Build Configuration**
   ```bash
   # netlify.toml
   [build]
     publish = "dist"
     command = "npm run build"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables in Netlify Dashboard**
   ```
   VITE_BACKEND_URL=https://your-render-backend.onrender.com
   ```

### Backend Deployment (Render)

1. **Dockerfile Configuration**
   ```dockerfile
   FROM eclipse-temurin:17-jdk-alpine
   VOLUME /tmp
   COPY target/*.jar app.jar
   ENTRYPOINT ["java","-jar","/app.jar"]
   ```

2. **Render Configuration**
   - Runtime: Docker
   - Health Check Path: /api/health
   - Environment Variables: Set database and JWT configuration

### Database Deployment (NeonDB)

1. **Create NeonDB Project**
2. **Configure Connection Pooling**
3. **Set up automated backups**
4. **Configure connection string with pooling**

## Performance Considerations

### Database Optimization
- Indexes on frequently queried columns (short_code, user_id, clicked_at)
- Connection pooling with HikariCP
- Query optimization with EXPLAIN ANALYZE
- Regular database maintenance and vacuuming

### Caching Strategy
- Redis caching for frequently accessed URLs (future implementation)
- HTTP caching headers for static assets
- Browser caching for API responses where appropriate

### API Performance
- Pagination for large datasets
- Rate limiting on creation endpoints
- Async processing for analytics events
- Database connection pooling

## Error Handling

### HTTP Status Codes
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server-side error

### Structured Error Responses
```json
{
  "timestamp": "2023-11-15T10:00:00.000Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid URL format",
  "path": "/api/urls/shorten",
  "details": [
    {
      "field": "originalUrl",
      "message": "Must be a valid URL"
    }
  ]
}
```

### Custom Exceptions
- `ResourceNotFoundException` - 404 errors
- `ValidationException` - 400 errors with details
- `AuthenticationException` - 401 errors
- `RateLimitException` - 429 errors

## Testing

### Backend Testing
```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=UrlServiceTest

# Generate test coverage report
./mvnw jacoco:report
```

### Frontend Testing
```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run end-to-end tests
npm run test:e2e
```

### Test Structure
- **Unit Tests**: Service layer and utility functions
- **Integration Tests**: API endpoints with TestRestTemplate
- **Repository Tests**: Database operations with @DataJpaTest
- **Security Tests**: Authentication and authorization flows

## Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow Google Java Style Guide for backend code
- Use ESLint and Prettier for frontend code
- Write meaningful commit messages
- Include tests for new functionality
- Update documentation for API changes

### Pull Request Process
1. Ensure all tests pass
2. Update documentation if needed
3. Request review from maintainers
4. Address review comments
5. Merge after approval

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact the maintainers at the repository's discussion page.

## Acknowledgments

- Spring Boot team for the excellent framework
- React community for comprehensive documentation
- Vite team for the fast build tool
- Tailwind CSS for the utility-first CSS framework
- NeonDB for the serverless PostgreSQL offering