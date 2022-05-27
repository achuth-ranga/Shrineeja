### STAGE 1: Build ###
FROM node:16.15.0-alpine AS build
ARG ENV=prod
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN echo "Building for env $ENV"
RUN npm run build --$ENV
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/srinija /usr/share/nginx/html