# Real Estate Listing API

A full-featured RESTful API for real estate listings built with Node.js, Express, and MongoDB.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev

# Start production server
npm start
```

## API Documentation

The API will be running at `http://localhost:5000`

### Quick Test

Visit `http://localhost:5000` to see the welcome message with all available endpoints.

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Key Features

- User authentication with JWT
- Role-based access control (buyer, seller, agent, admin)
- Property CRUD with advanced filtering
- Agent profiles with ratings
- Favorites and saved searches
- Inquiry system
- Review and rating system

## Main Endpoints

- **Auth**: `/api/auth` - Register, login, profile management
- **Properties**: `/api/properties` - Property listings and management
- **Agents**: `/api/agents` - Agent profiles
- **Favorites**: `/api/favorites` - User favorites and saved searches
- **Inquiries**: `/api/inquiries` - Property inquiries
- **Reviews**: `/api/reviews` - Property and agent reviews

For detailed documentation, see [PROJECT-BRIEF.md](PROJECT-BRIEF.md)

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## Contributing

Feel free to submit issues and enhancement requests!
