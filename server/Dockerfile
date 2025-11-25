# Use Node
FROM node:18-alpine
# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install deps
RUN npm install --production
# Copy server code
COPY . .
ENV PORT=3000
# Expose backend port
EXPOSE 3000
# Start API server
CMD ["npm", "start"]