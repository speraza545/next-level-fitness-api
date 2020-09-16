#!/bin/bash

API="http://localhost:4741"
URL_PATH="/characters"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "character": {
    "name": "'"${NAME}"'",
    "class": "'"${CLASS}"'",
    "health": "'"${HEALTH}"'",
    "strength": "'"${STRENGTH}"'",
    "stamina": "'"${STAMINA}"'",
    "magick": "'"${MAGICK}"'",
    "healing": "'"${HEALING}"'"
  }
}'

echo
