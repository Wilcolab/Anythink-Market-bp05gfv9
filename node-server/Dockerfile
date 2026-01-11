FROM node:14

WORKDIR /app

COPY package*.json /app
RUN yarn install --production=false
EXPOSE 8001

CMD [ "yarn", "start" ]
