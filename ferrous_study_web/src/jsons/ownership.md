---
key: 118
name: ownership
addData: 07/06/2025
updateData: null
keywords: 
 - ownership
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ownership
Todos los enlaces a variables tienen un ámbito donde son válidos y se produce un error cuando se usan fuera de él:

Decimos que el valor pertenece a la variable. Cada valor en Rust tiene exactamente un dueño en todo tiempo.

Al final del ámbito, la variable se elimina y los datos se liberan. Un destructor puede correr en este momento para librar recursos.

Los participantes que estén familiarizados con las implementaciones de recolección de elementos no utilizados sabrán que este tipo de recolector
comienza con un conjunto de “raíces” para buscar toda la memoria disponible. El principio de “propietario único” de Rust es una idea similar.
language&>es-ES<&