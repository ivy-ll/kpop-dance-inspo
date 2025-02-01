# Use the official Node.js image from Docker Hub
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5000

# Serve the app
CMD ["npx", "serve", "build"]