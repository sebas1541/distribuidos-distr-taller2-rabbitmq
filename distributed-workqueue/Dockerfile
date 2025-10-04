FROM node:18-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY *.ts ./

# Build TypeScript
RUN npm run build

# Default command (can be overridden)
CMD ["node", "dist/producer.js"]