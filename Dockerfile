# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json files
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN cd client && npm install
RUN cd server && npm install

# Copy the rest of the application code
COPY client ./client
COPY server ./server

# Build the client application
RUN cd client && npm run build

# Expose the ports the app runs on
EXPOSE 3000 5000

# Create a start script
RUN echo '#!/bin/sh\ncd /app/server && node server.js & cd /app/client && npm run preview' > start.sh
RUN chmod +x start.sh

# Define the command to run the app
CMD ["/bin/sh", "./start.sh"]
