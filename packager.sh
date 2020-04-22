#!/bin/bash

set -ex

OUT_DIR=dist

mkdir -p $OUT_DIR

go build -o $OUT_DIR/main ./backend

GOOS=windows GOARCH=386 \
  CGO_ENABLED=1 \
  CXX=i686-w64-mingw32-g++ \
  CC=i686-w64-mingw32-gcc \
  go build -o $OUT_DIR/main.exe ./backend

cd frontend
npm i
npm run build
cd ..

zip $OUT_DIR/release.zip config.json
cd $OUT_DIR
zip release.zip main main.exe
cd ..
cd ./frontend
zip -r ../$OUT_DIR/release.zip dist
