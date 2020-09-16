#!/bin/bash

API="http://localhost:4741"
URL_PATH="/characters"

curl "${API}${URL_PATH}/${ID}/work-outs" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "workOut": {
      "date": "'"${DATE}"'",
      "type": "'"${TYPE}"'",
      "title": "'"${TITLE}"'",
      "reps": "'"${REPS}"'",
      "minutes": "'"${MINUTES}"'",
      "content": "'"${CONTENT}"'"
    }
  }'

echo
