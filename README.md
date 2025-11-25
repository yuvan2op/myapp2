# MyApp2 - Full MERN Stack Application

A complete MERN (MongoDB, Express, React, Node.js) stack application with Docker support.

## Architecture

```
Frontend (React + Vite)     ← Port 80 (NGINX)
        ↓
API Gateway (NGINX)         ← Routes to backend
        ↓
Backend (Express.js)        ← Port 3000
        ↓
Database (MongoDB)          ← Port 27017
```

## Prerequisites

- Docker & Docker Compose
- Git

## Project Structure

```
myapp2/
├── client/                 # React frontend
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose schemas
│   ├── .env
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── server.js
│   └── package.json
├── docker-compose.yml
└── .gitignore
```

## Quick Start

### Build and Run with Docker Compose

```bash
# Navigate to project directory
cd myapp2

# Build images and start services
docker compose up --build

# In another terminal, view logs
docker compose logs -f
```

### Access Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017 (internal only)

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/hello` - Test endpoint

### Example Request

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }'

# Get all users
curl http://localhost:3000/api/users
```

## Development

### Backend Development (Local)

```bash
cd server
npm install
npm run dev
```

### Frontend Development (Local)

```bash
cd client
npm install
npm run dev
```

## Environment Variables

**Server (.env)**

```
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/myapp2
NODE_ENV=production
```

## Docker Commands

```bash
# Start services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Remove volumes (delete database)
docker compose down -v

# Rebuild images
docker compose up --build
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on specific port
sudo lsof -i :80
sudo kill -9 <PID>
```

### MongoDB Connection Issues

```bash
# Check MongoDB logs
docker compose logs mongodb

# Ensure MongoDB is healthy
docker compose ps
```

### Frontend Not Loading

```bash
# Clear Docker cache and rebuild
docker compose down -v
docker compose up --build
```

## Dependencies

### Frontend
- React 18.2.0
- Vite 7.2.4

### Backend
- Express 4.18.2
- Mongoose 8.0.0
- CORS 2.8.5

### Database
- MongoDB 7

## Production Deployment

1. Ensure all environment variables are set
2. Build images: `docker compose build`
3. Push to registry
4. Deploy to production environment
5. Set environment variables on production

## License

MIT
