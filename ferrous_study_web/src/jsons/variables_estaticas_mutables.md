---
key: 93
name: variables_estaticas_mutables
addData: 3/07/2025
updateData: null
keywords: 
 - variables estaticas smutables
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Variables Estáticas Mutables
Es seguro leer una variable estática inmutable:

```rust
static HELLO_WORLD: &str = "¡Hola, mundo!";

fn main() {
    println!("HELLO_WORLD: {HELLO_WORLD}");
}
```

Sin embargo, dado que pueden producirse carreras de datos, no es seguro leer y escribir variables estáticas mutables:

```rust
static mut COUNTER: u32 = 0;

fn add_to_counter(inc: u32) {
    // SAFETY: There are no other threads which could be accessing `COUNTER`.
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_counter(42);

    // SAFETY: There are no other threads which could be accessing `COUNTER`.
    unsafe {
        println!("CONTADOR: {COUNTER}");
    }
}
```

Este programa es seguro porque tiene un único hilo. Sin embargo, el compilador de Rust es conservador y asumirá lo peor. Prueba a eliminar unsafe y observa cómo el compilador explica que cambiar un elemento estático desde varios hilos es un comportamiento indefinido.

No suele ser buena idea usar una variable estática mutable, pero en algunos casos puede encajar en código no_std de bajo nivel, como implementar una asignación de heap o trabajar con algunas APIs C.
language&>es-ES<&