# ---- Stage 1: Build React App ----
FROM node:20.9.0-alpine AS react-build

# Set working directory for React build
WORKDIR /app/reactjs

# Copy React app package files and install dependencies
COPY reactjs/package*.json ./
RUN npm install

# Copy rest of the React app and build it
COPY reactjs/ ./
RUN npm run build


# ---- Stage 2: Set up API ----
FROM node:20.9.0-alpine

# Set working directory for API
WORKDIR /usr/src/app

# Copy API package files and install dependencies
COPY api/package*.json ./
RUN npm install

# Copy API source code
COPY api/ .

# Copy built React app from previous stage into desired location (e.g. public/)
COPY --from=react-build /app/reactjs/dist ./public

# Expose API port
EXPOSE 3000

# Start the API
CMD ["npm", "start"]
