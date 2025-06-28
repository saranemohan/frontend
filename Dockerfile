FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Install only production deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# If using Next.js with custom server, expose port accordingly
EXPOSE 3000

CMD ["npm", "start"]