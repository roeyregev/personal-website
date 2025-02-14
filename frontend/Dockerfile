# 🌟 Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and lockfile first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the app
COPY . ./

# Build Next.js app
RUN npm run build

# 🌟 Production Stage
FROM node:18-alpine

WORKDIR /app

# Copy built assets and dependencies from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production

# Start the app
CMD ["npm", "run", "start"]