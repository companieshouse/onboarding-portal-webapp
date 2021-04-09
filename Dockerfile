FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN /usr/src/app/node_modules/typescript/bin/tsc -p tsconfig.json

USER node

EXPOSE 3000

CMD [ "node", "./dist/bin/www" ]

