#!/bin/bash

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Build Docker images
echo "Building Docker images..."
docker build -t myapp2-server:latest ./server
docker build -t myapp2-client:latest ./client

# Stop existing containers
echo "Stopping existing containers..."
docker compose down

# Start new containers
echo "Starting services..."
docker compose up -d

# Wait for services to start
sleep 5

# Health checks
echo "Performing health checks..."
curl -f http://localhost:3000/api/hello || exit 1
curl -f http://localhost/ || exit 1

echo "✅ Deployment completed successfully!"
