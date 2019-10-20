FROM node:10.16.3-alpine

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000
CMD [ "node", "index.js" ]