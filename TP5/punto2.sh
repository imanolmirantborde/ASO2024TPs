#!/bin/bash

echo "El script se está ejecutando."

echo "Introduce un nombre:"
read name

if [[ -z "$name" ]]; then
    echo "Nombre no válido. Por favor introduce un nombre."
    exit 1
fi

URL="https://api.genderize.io/?name=$name"

echo "Haciendo solicitud a la API..."
RESPONSE=$(curl -s "$URL")

echo "Respuesta de la API: $RESPONSE"

GENDER=$(echo $RESPONSE | jq -r '.gender')
PROBABILITY=$(echo $RESPONSE | jq -r '.probability')

if [[ "$GENDER" == "null" ]]; then
    echo "No se pudo determinar el género probable para el nombre $name."
else
    echo "El género probable para el nombre $name es $GENDER con una probabilidad de $PROBABILITY."
fi

sleep 3

        