FROM node:14-alpine AS build
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
#Delete src and test to not copy into final image
RUN rm -rf src/
RUN rm -rf test/
RUN rm -rf node_modules/

FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY --from=build /usr/src/app ./

USER node

EXPOSE 3000

CMD [ "node", "./dist/bin/www" ]
