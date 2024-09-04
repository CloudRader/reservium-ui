# Build stage
FROM node:alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy all application files and build the app
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the built app to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: If you have a custom Nginx config file, adjust the path accordingly
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (the default port for HTTP)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]