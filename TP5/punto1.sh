#!/bin/bash

# Solicitar la elección del usuario
echo "Elige: piedra, papel o tijeras"
read user_choice

# Validar la entrada del usuario
if [[ "$user_choice" != "piedra" && "$user_choice" != "papel" && "$user_choice" != "tijeras" ]]; then
    echo "Entrada no válida. Por favor elige piedra, papel o tijeras."
    exit 1
fi

# Generar una elección aleatoria para la computadora
random_number=$(( (RANDOM % 3) + 1 ))

if [ "$random_number" -eq 1 ]; then
    computer_choice="piedra"
elif [ "$random_number" -eq 2 ]; then
    computer_choice="papel"
else
    computer_choice="tijeras"
fi

# Mostrar las elecciones
echo "Tú elegiste: $user_choice"
echo "La computadora eligió: $computer_choice"

# Determinar el ganador
if [ "$user_choice" == "$computer_choice" ]; then
    echo "Es un empate!"
elif [ "$user_choice" == "piedra" ] && [ "$computer_choice" == "tijeras" ]; then
    echo "¡Ganas tú!"
elif [ "$user_choice" == "papel" ] && [ "$computer_choice" == "piedra" ]; then
    echo "¡Ganas tú!"
elif [ "$user_choice" == "tijeras" ] && [ "$computer_choice" == "papel" ]; then
    echo "¡Ganas tú!"
else
    echo "Gana la computadora."
fi

# Agregar un delay para que no se cierre tan rápido
sleep 3