# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Etapa final
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 8080
CMD ["node", "index.js"]
