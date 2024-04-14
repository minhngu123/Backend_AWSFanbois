FROM node:16-alpine

RUN apk update && apk add --no-cache openssl

WORKDIR /app
RUN npm install -g ts-node-dev
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]