FROM node:14 AS build
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build


FROM nginx:alpine
COPY --from=build /frontend/build /usr/share/nginx/html