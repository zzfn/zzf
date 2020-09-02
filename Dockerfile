#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
COPY .next /app/.next
RUN npm install --production
EXPOSE 9600
CMD [ "npm", "start" ]