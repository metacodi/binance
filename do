#!/bin/sh

FIRST_ARGUMENT="$1"
SECOND_ARGUMENT="$2"
THIRD_ARGUMENT="$3"
CURDIR="$(pwd)"


if [ $FIRST_ARGUMENT == "pub" ] 
then
  npx ts-node publish/publish.ts
fi

if [ $FIRST_ARGUMENT == "metacodi" ] 
then
  npx ts-node publish/upgrade-metacodi-dependencies.ts
fi

if [ $FIRST_ARGUMENT == "test" ] 
then
  if [ $SECOND_ARGUMENT == "api" ] 
  then
    npx ts-node test/test-api.ts
  else if [ $SECOND_ARGUMENT == "market" ] 
    npx ts-node test/test-ws-market.ts
  else if [ $SECOND_ARGUMENT == "user" ] 
    npx ts-node test/test-ws-user.ts
  fi
fi

