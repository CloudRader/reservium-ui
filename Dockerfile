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

# Accept and use build argument for Vite
ARG VITE_GOOGLE_CALENDAR_API_KEY
ENV VITE_GOOGLE_CALENDAR_API_KEY=$VITE_GOOGLE_CALENDAR_API_KEY

RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the built app to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: If you have a custom Nginx config file, adjust the path accordingly
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (the default port for HTTP)
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
