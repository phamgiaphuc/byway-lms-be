# ---------- 1. Base Builder Image ----------
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl libc6-compat

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts .

# Install all deps
RUN pnpm install --frozen-lockfile

# Copy rest of project
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build TypeScript
RUN pnpm build


# ---------- 2. Production Runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl libc6-compat

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Only install production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy build output (dist)
COPY --from=builder /app/dist ./dist

# Copy Prisma schema + generated client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/lib/generated/prisma ./src/lib/generated/prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts


# Start: run migrations then server
CMD pnpm prisma migrate deploy && node dist/index.js
