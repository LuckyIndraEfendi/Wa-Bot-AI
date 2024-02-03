FROM node:alpine
ENV NODE_ENV production
ENV APIKEY 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
WORKDIR /wa-bot-automate
COPY . .
RUN npm install
CMD [ "node", "server.js" ]