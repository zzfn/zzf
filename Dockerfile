#FROM node:lts-alpine
#COPY ./ /app
#WORKDIR /app
#RUN npm install && npm run build
#EXPOSE 9600
#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]