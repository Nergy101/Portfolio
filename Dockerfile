### STAGE 1: Build ###
FROM node:19.3-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/portfolio /usr/share/nginx/html
EXPOSE 80

# docker build -t nergy101/portfolio:v1 .
# docker run --name portfolio --restart unless-stopped -p 80:80 -d nergy101/portfolio:v1
