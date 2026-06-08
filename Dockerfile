# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy all application files and build the app
COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the built app to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the env.sh script and make it executable
COPY env.sh /usr/share/nginx/html/env.sh
RUN chmod +x /usr/share/nginx/html/env.sh

# Optional: If you have a custom Nginx config file, adjust the path accordingly
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx by first generating the env-config.js file
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"]
