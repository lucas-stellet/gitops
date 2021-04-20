FROM golang:alpine

WORKDIR /go/src/fullcycle

COPY . . 

RUN GOOS=linux go build -ldflags="-s -w"

CMD ["./fullcycle"]