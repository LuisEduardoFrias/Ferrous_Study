---
key: 104
name: send
addData: 3/07/2025
updateData: null
keywords: 
 - send
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Send
Un tipo T es Send si es seguro mover un valor T a otro hilo.

El efecto de mover la propiedad a otro hilo es que los destructores se ejecutarán en ese hilo. Por tanto, la cuestion es cuándo se puede asignar un valor a un hilo y desasignarlo en otro.

Por ejemplo, solo se puede acceder a una conexión a la biblioteca SQLite desde un único hilo.
language&>es-ES<&