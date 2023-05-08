FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY firebase*.json ./

RUN npm install @babel/cli -g
RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["node", "./dist/app.js"]
