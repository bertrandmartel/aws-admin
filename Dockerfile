# build environment
FROM node:12.2.0-alpine as frontend
WORKDIR /app
COPY frontend/package.json /app/package.json
RUN npm install
COPY frontend/vue.config.js /app/vue.config.js
COPY frontend/src /app/src
COPY frontend/public /app/public
RUN npm run build


FROM golang:alpine
RUN mkdir /app 
ADD . /app
WORKDIR /app
COPY --from=frontend /app/dist /app/dist
RUN go build -o main ./backend
RUN adduser -S -D -H -h /app appuser
USER appuser
CMD ["./main"]
