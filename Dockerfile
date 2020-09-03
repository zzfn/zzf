#ENTRYPOINT ["npm", "run","start"]
#FROM node:lts-alpine
#WORKDIR /app
#COPY package.json /app
#COPY build /app/build
#COPY public /app/public
#RUN npm install --production
#EXPOSE 9600
#CMD [ "npm", "start" ]

FROM node:lts-alpine
COPY ./ /app
WORKDIR /app
RUN npm install && npm run build

FROM node:lts-alpine
RUN mkdir /app
COPY --from=0 /app/build /app/build
COPY --from=0 /app/public /app/public
COPY --from=0 /app/package.json /app
RUN npm install --production
EXPOSE 9600
CMD [ "npm", "start" ]