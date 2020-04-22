#!/usr/bin/env sh

set -e

export NODE_ENV=github
mkdir -p api
mv ./src/api/* ./api/
cp ./demo/* ./src/api/

npm run github

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:bertrandmartel/aws-admin.git master:gh-pages

cp ./api/* ./src/api/
rm -rf api