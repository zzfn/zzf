FROM node:lts-alpine
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY public ./public
COPY .next/standalone ./

USER nextjs

EXPOSE 3000

ENV TZ="Asia/Shanghai"
ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
