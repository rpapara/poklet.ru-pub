# Stage 1 — build with Vite
FROM node:20 AS build

ARG VITE_API_URL

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

# Create .env file based on ARG
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env

RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]