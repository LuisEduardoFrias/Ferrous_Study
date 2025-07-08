---
key: 103
name: traits_marcador
addData: 3/07/2025
updateData: null
keywords: 
 - traits
 - marcador
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Traits de Marcador
How does Rust know to forbid shared access across threads? The answer is in two traits:

 - Send: un tipo T es Send si es seguro mover un T entre los límites de un hilo.
 - Sync: un tipo T es Sync si es seguro mover un &T entre los límites de un hilo.

Send and Sync are unsafe traits. The compiler will automatically derive them for your types as long as they only contain Send and Sync types. You can also implement them manually when you know it is valid.

Se podría pensar en estos traits como marcadores que indican que el tipo tiene ciertas propiedades de seguridad en hilos.
Se pueden utilizar en las restricciones genéricas como traits normales.
language&>es-ES<&