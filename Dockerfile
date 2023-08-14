FROM node:16-alpine
WORKDIR /app

ENV TZ="Asia/Shanghai"
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY public ./public
COPY .next/standalone ./

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
