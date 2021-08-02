FROM node

RUN mkdir /home/app
COPY ./app /home/app

WORKDIR /home/app
RUN yarn
# RUN npm run watch
# RUN sleep 10

ENTRYPOINT yarn start:js
