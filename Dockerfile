### STAGE 1: Build ###
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.25-alpine
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/portfolio/browser /usr/share/nginx/html
EXPOSE 80


# local:
# docker auth
# linux/arm/v7 
# docker login
# docker buildx build --platform linux/amd64,linux/arm64 -t nergy101/portfolio:v1-arm --push .

# on VM:
# docker pull nergy101/portfolio:v1-arm
# docker stop portfolio && docker rm portfolio
# docker run --restart unless-stopped -p 8080:80 -d --name portfolio nergy101/portfolio:v1-arm