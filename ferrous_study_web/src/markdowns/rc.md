---
key: 126
name: rc
addData: 07/06/2025
updateData: null
keywords: 
 - rc
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Rc
Rc es un puntero compartido de referencia contada. Utilízalo cuando necesites hacer referencia a los mismos datos desde varios lugares:

```rust
use std::rc::Rc;

fn main() {
    let a = Rc::new(10);
    let b = Rc::clone(&a);

    println!("a: {a}");
    println!("b: {b}");
}
```

Consulta Arc y Mutex si te encuentras en un contexto multihilo.
Puedes degradar un puntero compartido en un puntero Weak para crear ciclos que se abandonarán.

El recuento de Rc asegura que el valor que contiene sea válido mientras haya referencias.
Rc en Rust es como std::shared_ptr en C++.
Rc::clone es simple: crea un puntero en la misma asignación y aumenta el recuento de referencias. No hace clones completos y, por lo general, se puede ignorar cuando se buscan problemas de rendimiento en el código.
make_mut clona el valor interno si es necesario (“copiar al escribir”) y devuelve una referencia mutable.
Comprueba el recuento de referencias con Rc::strong_count.
Rc::downgrade ofrece un objeto de referencia contada debil para crear ciclos que que se borraran propiamente (probablemente en combinación con
RefCell).
language&>es-ES<&