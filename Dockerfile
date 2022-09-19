from node:latest

ENV NODE_ENV=production

COPY ./src .

RUN npm install --production