# Use the official Node.js 14 image as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run your application
CMD ["npm", "run", "dev"]