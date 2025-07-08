---
key: 99
name: hilos_ambito
addData: 3/07/2025
updateData: null
keywords: 
 - hilos
 - ambito
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Hilos con ámbito
Los hilos normales no pueden tomar nada prestado de su entorno:

```Rust
use std::thread;

fn foo() {
    let s = String::from("Hola");
    thread::spawn(|| {
        println!("Longitud: {}", s.len());
    });
}

fn main() {
    foo();
}
```

Sin embargo, puedes usar un hilo con ámbito para lo siguiente:

```Rust
use std::thread;

fn main() {
    let s = String::from("Hola");

    thread::scope(|scope| {
        scope.spawn(|| {
            println!("Longitud: {}", s.len());
        });
    });
}
```

La razón es que, cuando se completa la función thread::scope, se asegura que todos los hilos están unidos, por lo que pueden devolver datos prestados.
Se aplican las reglas normales de préstamo de Rust: un hilo puede tomar datos prestados de manera mutable o cualquier número de hilos puede tomar datos prestados de manera inmutable.
language&>es-ES<&