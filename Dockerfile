FROM node:8

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 13000

CMD ["npm","start"]