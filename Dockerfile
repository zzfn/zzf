#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 9600
CMD [ "npm", "start" ]