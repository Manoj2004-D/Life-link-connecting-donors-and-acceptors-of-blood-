# Use Node.js LTS
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 8080

# Start server
CMD ["npx", "ts-node", "server.ts"]

