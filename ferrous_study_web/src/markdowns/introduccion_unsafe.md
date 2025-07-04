---
key: 90
name: introduccion_unsafe
addData: 3/07/2025
updateData: null
keywords: 
 - introducción unsafe
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Unsafe Rust
El lenguaje Rust tiene dos partes:

Safe Rust: memoria segura, sin posibilidad de comportamiento indefinido.
Unsafe Rust: puede activar un comportamiento no definido si se infringen las condiciones previas.
We saw mostly safe Rust in this course, but it’s important to know what Unsafe Rust is.

Por lo general, el código inseguro es pequeño y está aislado, y su corrección debe estar bien documentada. Suele estar envuelto en una capa de abstracción segura.

Rust inseguro te permite acceder a cinco nuevas funciones:

Desreferenciar punteros sin formato.
Acceder o modificar variables estáticas mutables.
Acceder a los campos union.
Llamar a funciones unsafe, incluidas las funciones extern.
Implementar traits unsafe.
A continuación, hablaremos brevemente sobre las funciones que no son seguras. Para obtener más información, consulta el capítulo 19.1 del Libro de Rust y el documento Rustonomicon.

Unsafe Rust does not mean the code is incorrect. It means that developers have turned off some compiler safety features and have to write correct code by themselves. It means the compiler no longer enforces Rust’s memory-safety rules.
language&>es-ES<&