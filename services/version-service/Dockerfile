FROM node:20-alpine

# 1️⃣ Root workdir
WORKDIR /app

# 2️⃣ Copy only what you need for this service
COPY package*.json ./
COPY packages ./packages
COPY services/version-service ./services/version-service

# 3️⃣ Install dependencies for the monorepo
RUN npm install --legacy-peer-deps

# 4️⃣ Install nodemon globally
RUN npm install -g nodemon

# 5️⃣ Switch to the service folder
WORKDIR /app/services/version-service

# 6️⃣ Expose port
EXPOSE 3000

# 7️⃣ Start the service
CMD ["nodemon", "src/app.js"]
