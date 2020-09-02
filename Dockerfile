#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine
WORKDIR /app
COPY .next /app
COPY package.json /app
RUN npm install --production
EXPOSE 9600
CMD [ "npm", "start" ]