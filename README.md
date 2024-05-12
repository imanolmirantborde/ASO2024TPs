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
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void *comer_hamburguesa(void *tid)
{
	while (1 == 1)
	{ 
		pthread_mutex_lock(&mutex);
		if (cantidad_restante_hamburguesas > 0)
		{
			printf("Hola! soy el hilo (comensal) %d , me voy a comer una hamburguesa! Todavía quedan %d\n", (int) tid, cantidad_restante_hamburguesas);
			cantidad_restante_hamburguesas--;
		}
		else
		{
			printf("¡SE TERMINARON LAS HAMBURGUESAS! :( \n");
			pthread_mutex_unlock(&mutex);
			pthread_exit(NULL);
		}
		pthread_mutex_unlock(&mutex);
	}
}

int main(int argc, char *argv[])
{
	pthread_t threads[NUMBER_OF_THREADS];
	int status, i, ret;
	for (int i = 0; i < NUMBER_OF_THREADS; i++)
	{
		printf("Hola!, soy el hilo principal. Estoy creando el hilo %d\n", i);
		status = pthread_create(&threads[i], NULL, comer_hamburguesa, (void *)i);
		if (status != 0)
		{
			printf("Algo salió mal al crear el hilo. Recibí el código de error %d\n", status);
			exit(-1);
		}
	}

	for (i = 0; i < NUMBER_OF_THREADS; i++)
	{
		void *retval;
		ret = pthread_join(threads[i], &retval);
		if (ret != 0)
		{
			printf("Error al esperar la terminación del hilo %d\n", i);
			exit(-1);
		}
	}
	pthread_exit(NULL);
}
```
