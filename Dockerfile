#ENTRYPOINT ["npm", "run","start"]
FROM node:lts-alpine
COPY . /app
WORKDIR /app
RUN npm install&&npm run build
EXPOSE 9600
CMD [ "npm", "start" ]