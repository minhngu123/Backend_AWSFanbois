FROM node:16

RUN apt-get update && apt-get install -y openssl

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]