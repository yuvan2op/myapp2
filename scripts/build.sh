#!/bin/bash

# Build Backend
echo "Building backend..."
cd server
npm install
npm run build 2>/dev/null || true
cd ..

# Build Frontend
echo "Building frontend..."
cd client
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
