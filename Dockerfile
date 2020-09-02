FROM node:lts-alpine
COPY ./ /app
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
RUN npm install && npm run build
EXPOSE 9600
ENTRYPOINT ["npm", "run","start"]