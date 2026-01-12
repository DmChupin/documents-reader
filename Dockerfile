FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm ci
COPY . .
RUN ng build --configuration production

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/documents-reader/browser /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]