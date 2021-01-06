FROM node:lts-alpine3.12

RUN apk add bash 

RUN apk add httpie

WORKDIR /process/

COPY . . 

CMD ["node", "api/index.js"]