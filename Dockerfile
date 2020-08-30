FROM node:lts-alpine
WORKDIR /app
COPY ./ /app

RUN npm install && npm run build

# FROM nginx
# RUN mkdir /app
# COPY --from=0 /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf
CMD [ "npm", "start" ]
EXPOSE 80