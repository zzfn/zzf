FROM node:lts-alpine
WORKDIR /app
COPY package.json /app
COPY ./.next /app/.next
COPY public /app/public
RUN npm install --production
EXPOSE 9600
ENTRYPOINT ["npm", "run","start"]
#CMD [ "npm","run", "start" ]