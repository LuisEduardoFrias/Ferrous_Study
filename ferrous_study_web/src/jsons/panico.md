---
key: 82
name: panico
addData: 3/07/2025
updateData: null
keywords: 
 - panico
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Pánicos
Rust gestiona los errores críticos con un “pánico”.

Rust activará un panic si se produce un error grave en runtime:

```rust
fn main() {
    let v = vec![10, 20, 30];
    println!("v[100]: {}", v[100]);
}
```

Los panics se usan para errores irrecuperables e inesperados.
Los panics son un síntoma de que hay fallos en el programa.
Los fallos del tiempo de ejecución, como las comprobaciones de límites fallidas, pueden causar un pánico
Las aserciones (como assert!) causan un pánico cuando fallan
Los pánicos con fines específicos pueden usar la macro panic!.
Cuando se produce un pánico, se “desenrolla” la pila y se eliminan los valores como si las funciones hubieran devuelto un resultado.
Utiliza API que no activen panics (como Vec::get) si no se admiten fallos.


De forma predeterminada, el panic hará que la stack se desenrolle. El proceso de desenrrollado se puede detectar:

```rust
use std::panic;

fn main() {
    let result = panic::catch_unwind(|| "No hay ningún problema.");
    println!("{result:?}");

    let result = panic::catch_unwind(|| {
        panic!("¡Vaya!");
    });
    println!("{result:?}");
}
```

El catching no es habitual, por lo que recomendamos no implementar excepciones con catch_unwind!
Esto puede ser útil en los servidores que deben seguir ejecutándose aunque una sola solicitud falle.
No funciona si panic = 'abort' está definido en Cargo.toml.

language&>es-ES<&