FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

USER node

COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]

