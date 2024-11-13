FROM node:18-alpine
WORKDIR /app

COPY public ./public
COPY .next/standalone ./

ENV TZ=Asia/Shanghai \
    NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", "server.js"]
