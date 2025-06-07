---
key: 99
name: tipos_biblioteca_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - biblioteca estandar
 - tipos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Biblioteca estándar
Rust viene con una biblioteca estándar que ayuda a establecer un conjunto de tipos comunes que se usan en la biblioteca y los programas de Rust. De esta forma, dos bibliotecas pueden funcionar juntas sin problemas, puesto que ambas utilizan el mismo tipo String.

De hecho, Rust contiene varias capas de la biblioteca estándar: core, alloc y std.

```rust
/// Determina si el primer argumento es divisible por el segundo argumento.
///
/// Si el segundo es cero, el resultado será false.
fn is_divisible_by(lhs: u32, rhs: u32) -> bool {
    if rhs == 0 {
        return false;
    }
    lhs % rhs == 0
}
```

core incluye los tipos y funciones más básicos que no dependen de libc, de un allocator (asignador de memoria) ni de la presencia de un sistema operativo.
alloc incluye tipos que requieren un allocator de heap global, como Vec, Box y Arc.
Las aplicaciones embebidas en Rust menudo solo usan core y a algunas veces alloc.

## Documentación
Rust incluye una amplia documentación. Por ejemplo:

Todos los detalles sobre bucles.
Tipos primitivos como u8.
Tipos de la biblioteca estándar como Option o BinaryHeap.
De hecho, puedes documentar tu propio código:

El contenido se trata como Markdown. Todos los crates de la biblioteca de Rust publicados se documentan automáticamente en docs.rs mediante la herramienta rustdoc. Es propio documentar todos los elementos públicos de una API usando este patrón.

Para documentar un elemento desde dentro (por ejemplo, dentro de un módulo), utiliza //! o /*! .. */, denominado como “comentarios internos del documento”:

Muestra a los alumnos los documentos generados para el crate rand en https://docs.rs/rand.
language&>es-ES<&