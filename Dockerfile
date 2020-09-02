#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine
COPY .next /app
COPY package.json /app
WORKDIR /app
RUN npm install --production
EXPOSE 9600
CMD [ "npm", "start" ]