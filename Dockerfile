# -----------------------
# Build stage
# -----------------------
    FROM node:18 as build

    WORKDIR /app
    
    # Copy package files and install dependencies
    COPY shoptech/package*.json ./
    RUN npm install
    
    # Copy all source files (needed for build)
    COPY shoptech/ ./
    
    # Build React app
    RUN npm run build
    
    # -----------------------
    # Nginx stage
    # -----------------------
    FROM nginx:alpine
    
    # Copy custom nginx config
    COPY nginx.conf /etc/nginx/nginx.conf
    
    # Copy built React app from build stage
    COPY --from=build /app/build /usr/share/nginx/html
    
    # Expose port 80
    EXPOSE 80
    
    # Start nginx
    CMD ["nginx", "-g", "daemon off;"]
    