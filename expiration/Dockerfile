FROM node:16-alpine

RUN apk update && apk add --no-cache openssl

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]