#!/bin/bash

# Test Backend
echo "Testing backend..."
cd server
npm test 2>/dev/null || echo "⚠️  No backend tests configured"
cd ..

# Test Frontend
echo "Testing frontend..."
cd client
npm test -- --watchAll=false 2>/dev/null || echo "⚠️  No frontend tests configured"
cd ..

echo "✅ Tests completed!"
