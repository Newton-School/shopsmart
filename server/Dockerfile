# ── Stage 1: Install production dependencies ──────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ── Stage 2: Production image ─────────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

# Copy only production node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

# Healthcheck for Docker & ECS
HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:5001/health || exit 1

# Run as non-root user (built into node:alpine)
USER node

CMD ["node", "src/index.js"]
