FROM node:18-alpine AS builder

WORKDIR /app

# Copy only frontend directory
COPY frontend/package*.json ./
RUN npm install --frozen-lockfile

# Copy everything inside frontend
COPY frontend ./

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

CMD ["npm", "run", "start"]



# ---------- Attempt #01 -----------

# 1️⃣ Build stage
# FROM node:18-alpine AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install --frozen-lockfile

# # Copy all files
# COPY . .

# # Build the Next.js app
# RUN npm run build

# # 2️⃣ Run stage (Slimmer Image)
# FROM node:18-alpine

# WORKDIR /app

# # Copy only necessary files from builder stage
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules

# # Set environment variable for production
# ENV NODE_ENV=production

# # Expose Next.js default port
# EXPOSE 3000

# # Start the app
# CMD ["npm", "run", "start"]



# ---------- OLD & WORKING but with slow loading -----------

# Inherit from node over linux alpine:
    # FROM node:18-alpine3.19

    # # Create app folder: 
    # WORKDIR /app
    
    # # Copy package.json + package-lock.json:
    # COPY package*.json /app
    
    # # Install node_modules: 
    # RUN npm i
    
    # # Copy entire frontend:
    # COPY . /app
    
    # # Execute command for the container: 
    # ENTRYPOINT npm run dev