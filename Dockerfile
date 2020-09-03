#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
COPY build /app/build
COPY public /app/public
RUN npm install --production
EXPOSE 9600
CMD [ "npm", "start" ]