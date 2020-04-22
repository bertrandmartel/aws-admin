include .env
export

clean:
	@rm -rf dist
	@mkdir -p dist

build: clean
	./packager.sh

run:
	goimports -w ./backend
	gofmt -s -w ./backend
	go run ./backend/main.go

install:
	go get -u ./...

test:
	go test ./... --cover

