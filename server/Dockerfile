# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src/ ./src/

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app

# Non-root user setup
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

# Copy from build stage
COPY --from=build --chown=appuser:appgroup /app /app

EXPOSE 5000

# Healthcheck configured
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

CMD ["node", "src/index.js"]
