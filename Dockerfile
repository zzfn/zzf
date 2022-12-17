FROM node:16-alpine
WORKDIR /app
ls
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY /app/public ./public
COPY /app/.next/standalone ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
