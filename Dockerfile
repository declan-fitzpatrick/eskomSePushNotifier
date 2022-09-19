from node:latest

ENV NODE_ENV=production

COPY ./src .
COPY ./webhooks.ts .

RUN npm install --production