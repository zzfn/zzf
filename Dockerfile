FROM node:lts-alpine
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build
EXPOSE 9600
ENTRYPOINT ["npm", "run","start"]