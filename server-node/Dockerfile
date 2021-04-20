FROM node:lts-alpine3.12

RUN apk add bash 

WORKDIR /process/

COPY . . 

CMD ["node", "api/index.js"]