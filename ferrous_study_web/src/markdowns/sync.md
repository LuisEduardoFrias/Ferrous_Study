---
key: 105
name: sync
addData: 3/07/2025
updateData: null
keywords: 
 - sync
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
#Sync
Un tipo T es Sync si es seguro acceder a un valor T desde varios hilos al mismo tiempo.

En concreto, la definición es la siguiente:

T es Sync únicamente si &T es Send.

Esta instrucción es, básicamente, una forma resumida de indicar que, si un tipo es seguro para los hilos en uso compartido, también lo es para pasar referencias de él a través de los hilos.

Esto se debe a que, si el tipo es Sync, significa que se puede compartir entre múltiples hilos sin el riesgo de que haya carreras de datos u otros problemas de sincronización, por lo que es seguro moverlo a otro hilo. También es seguro mover una referencia al tipo a otro hilo, ya que se puede acceder de forma segura a los datos a los que hace referencia desde cualquier hilo.
language&>es-ES<&