# Build stage
FROM node:alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/sites-enabled/default
# Expose the port Nginx is listening on (default is 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
