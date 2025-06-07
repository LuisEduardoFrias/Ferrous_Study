---
key: 97
name: ejercicio_min_generico
addData: 06/06/2025
updateData: null
keywords: 
 - ejercicio
 - min generico
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: min genérico
En este breve ejercicio, implementarás una función min genérica que determina el mínimo de dos valores mediante el trait Ord.

```rust
use std::cmp::Ordering;

// TAREA: implementar la función `min` usada en `main`.

fn main() {
    assert_eq!(min(0, 10), 0);
    assert_eq!(min(500, 123), 123);

    assert_eq!(min('a', 'z'), 'a');
    assert_eq!(min('7', '1'), '1');

    assert_eq!(min("hola", "adios"), "adios");
    assert_eq!(min("murciélago", "armadillo"), "armadillo");
}
```

Enseña a los estudiantes el trait Ord y el enum Ordering.
language&>es-ES<&