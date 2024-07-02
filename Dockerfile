# Use the official Node.js 16 image as a parent image
FROM node:20 as base

RUN apt-get update && apt-get install -y postgresql-client

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma folder
COPY prisma ./prisma

# prisma database
RUN npx prisma generate

# Copy the rest of your application's code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run your application
CMD ["npm", "run", "start"]