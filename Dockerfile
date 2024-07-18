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

# docker build -t nergy101/portfolio:v1 .
# docker login
# docker push nergy101/portfolio:v1
# docker pull nergy101/portfolio:v1
# docker run --restart unless-stopped -p 8080:80 -d --name portfolio nergy101/portfolio:v1
