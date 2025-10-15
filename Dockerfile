# Stage 1 - build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# If your backend is on host, nginx proxy not required — frontend will call baseURL from env baked into build.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
