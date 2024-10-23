# Use an official Node runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN cd client && npm install && npm run build

# Install a simple server for serving static content
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Create a custom serve.json file
RUN echo '{"public": "client/dist", "rewrites": [{"source": "**", "destination": "/index.html"}]}' > serve.json

# Define the command to run the app
CMD ["serve", "-s", "client/dist", "-l", "3000", "--config", "../serve.json"]
