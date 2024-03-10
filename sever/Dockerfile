# BASE
FROM node:18.15-alpine AS base

RUN apk add --no-cache --virtual .build-deps \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    && apk add --no-cache --virtual .runtime-deps \
    cairo \
    jpeg \
    pango \
    giflib

WORKDIR /app

FROM base AS builder

# Install dependencies
COPY package.json ./

RUN npm install

# generate prisma
COPY prisma ./prisma

RUN npx prisma generate

# Copy source code
COPY . .

# Build
RUN npm run build

# Production
FROM base AS production

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 8080

# Start
CMD ["node", "dist/src/app.js"]