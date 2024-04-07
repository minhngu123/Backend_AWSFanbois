FROM node:18

RUN apt-get update && apt-get install -y openssl

WORKDIR /app
RUN npm install -g ts-node-dev
COPY package.json .
RUN npm install --only=prod
COPY . .

CMD ["npm", "run", "dev"]