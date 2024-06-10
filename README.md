respuestas tp 3 arqi
  
  1)  A) el tiempo cambia, puede tardar unas milésimas mas o menos de segundos. Pero siempre esta el primero en los 5 segundos y el segundo en los 4

B) no

c) la vedad que no paso nada, al ejecutarlo con o sin comentarios el tiempo esta entre los 0.00900 y los 0.00600 segundos

![tp 3 arctq](https://github.com/imanolmirantborde/ASO2024TPs/assets/166465473/bfa59113-160c-4805-bc0b-dedd3ecb401d)

```
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#define NUMBER_OF_THREADS 2
#define CANTIDAD_INICIAL_HAMBURGUESAS 20

int cantidad_restante_hamburguesas = CANTIDAD_INICIAL_HAMBURGUESAS;
int turno = 0; // Variable global para el control de turno

void *comer_hamburguesa(void *tid)
{
	int id = (int)tid;
	while (1)
	{ 
        
		while(turno != id);

		// INICIO DE LA ZONA CRÍTICA
		if (cantidad_restante_hamburguesas > 0)
		{
			printf("Hola! soy el hilo(comensal) %d , me voy a comer una hamburguesa ! ya que todavia queda/n %d \n", id, cantidad_restante_hamburguesas);
			cantidad_restante_hamburguesas--; // me como una hamburguesa
		}
		else
		{
			printf("SE TERMINARON LAS HAMBURGUESAS :( \n");
			// Actualizar el turno para que los otros hilos no se queden bloqueados
			turno = (turno + 1) % NUMBER_OF_THREADS;
			pthread_exit(NULL); // forzar terminacion del hilo
		}
        // SALIDA DE LA ZONA CRÍTICA

		
		turno = (turno + 1) % NUMBER_OF_THREADS;
	}
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUMBER_OF_THREADS];
	int status, i, ret;
	for (i = 0; i < NUMBER_OF_THREADS; i++)
	{
		printf("Hola!, soy el hilo principal. Estoy creando el hilo %d \n", i);
		status = pthread_create(&threads[i], NULL, comer_hamburguesa, (void *)i);
		if (status != 0)
		{
			printf("Algo salio mal, al crear el hilo recibi el codigo de error %d \n", status);
			exit(-1);
		}
	}

	for (i = 0; i < NUMBER_OF_THREADS; i++)
	{
		void *retval;
		ret = pthread_join(threads[i], &retval); // espero por la terminacion de los hilos que cree
	}
	pthread_exit(NULL); // como los hilos que cree ya terminaron de ejecutarse, termino yo tambien.
}

```
