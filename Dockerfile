FROM node:22-alpine AS build
WORKDIR /app
ARG CMS_API_URL=http://api:8090
ARG SITE_URL=http://localhost:4200
ARG ADMIN_ORIGIN=http://admin:80
ENV CMS_API_URL=$CMS_API_URL
RUN sed -i "s|cmsApiUrl: '[^']*'|cmsApiUrl: '${CMS_API_URL}'|" src/environments/environment.ts && \
    sed -i "s|siteUrl: '[^']*'|siteUrl: '${SITE_URL}'|" src/environments/environment.ts && \
    sed -i "s|adminOrigin: '[^']*'|adminOrigin: '${ADMIN_ORIGIN}'|" src/environments/environment.ts
COPY package*.json ./
RUN npm ci 2>/dev/null || npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/aero-cms-angular-starter/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
