ARG NODE=node:20.16.0-alpine

FROM ${NODE} as deps
LABEL version="1.0" maintainer="erkand.imeri@gmail.com"
WORKDIR /app
COPY . ./
RUN npm install

FROM ${NODE} as production
WORKDIR /app
COPY --from=deps /app/ ./
EXPOSE 3001
ENV PORT 3001
CMD ["node","/dist/index.js"]