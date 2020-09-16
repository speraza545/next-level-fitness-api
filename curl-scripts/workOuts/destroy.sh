#!/bin/bash

API="http://localhost:4741"
URL_PATH="/characters"

curl "${API}${URL_PATH}/${ID}/comments/${WORKOUTID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
