FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package manifest to install dependencies
COPY package.json package-lock.json* ./

# Install all deps (including dev for Prisma CLI) so we can generate the client
RUN npm ci --include=dev

# Copy repository files
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

FROM node:20-alpine

WORKDIR /app

# Use production env by default
ENV NODE_ENV=production

# Copy installed node_modules and backend sources from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/Backend ./Backend
COPY package.json ./

EXPOSE 3000

# On container start, apply migrations (if needed) then start server
CMD ["sh", "-c", "npm run prisma:deploy --silent || true && node Backend/src/server.js"]
