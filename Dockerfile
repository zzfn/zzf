#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
COPY ./.next /app
RUN npm install --production
EXPOSE 9600
CMD [ "npm", "start" ]