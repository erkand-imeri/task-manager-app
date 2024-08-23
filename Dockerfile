ARG NODE=node:20.16.0-alpine

# Stage 1: Install dependencies
FROM ${NODE} as deps
LABEL version="1.0" maintainer="erkand.imeri@gmail.com"
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Build the application
FROM deps as build
COPY . ./
RUN npm run build

# Stage 3: Production image
FROM ${NODE} as production
WORKDIR /app
COPY --from=build /app/ ./
EXPOSE 3001
ENV PORT 3001
CMD ["node", "/dist/index.js"]
