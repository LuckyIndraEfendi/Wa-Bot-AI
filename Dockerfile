FROM node:alpine
ENV NODE_ENV production
ENV APIKEY YOUR OPENAIN APIKEY
WORKDIR /wa-bot-automate
COPY . .
RUN npm install
CMD [ "node", "server.js" ]