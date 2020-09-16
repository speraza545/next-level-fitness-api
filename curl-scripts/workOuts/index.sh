#!/bin/bash

API="http://localhost:4741"
URL_PATH="/characters"

curl "${API}${URL_PATH}/${ID}/work-outs" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \

echo
