FROM node:18-alpine
WORKDIR /app

# Copy package.json files first
COPY package*.json ./

# Copy gemstone3-core first so the file: dependency can resolve
COPY gemstone3-core/ ./gemstone3-core/

# Install main dependencies (this will use the local gemstone3-core)
RUN npm install

# Copy the rest of the files
COPY . .

EXPOSE 4000 23
CMD ["npm", "start"]
