FROM node:16.9.1-slim

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

RUN yarn build

CMD [ "yarn","start"]
