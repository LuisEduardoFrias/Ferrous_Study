---
key: 117
name: tokio
addData: 3/07/2025
updateData: null
keywords: 
 - tokio
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Tokio
Tokio provides:
 - Un tiempo de ejecución multihilo para ejecutar código asíncrono
 - Una versión asíncrona de la biblioteca estándar
 - Un amplio ecosistema de bibliotecas.


- Con la macro tokio::main, podemos hacer que main sea asíncrono.
- La función spawn crea una “tarea” simultánea.
- Nota: spawn utiliza un Future, no se llama a .await en count_to.

Más información:
 - ¿Por qué count_to no suele llegar a 10? Se trata de un ejemplo de cancelación asíncrona. tokio::spawn devuelve un controlador que puede esperarse hasta que termine.
 - Prueba count_to(10).await en lugar de usar spawn.
 - Intenta esperar a la correción de la tarea de tokio::spawn.
language&>es-ES<&