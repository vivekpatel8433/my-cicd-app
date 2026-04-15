# Build stage
FROM node:22.17.1 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage (Nginx)
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html