FROM node
WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . .

CMD  [ "npm", "start", "0.0.0.0" ]

EXPOSE 10000