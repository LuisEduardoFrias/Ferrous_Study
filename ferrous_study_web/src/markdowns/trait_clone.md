---
key: 120
name: trait_clone
addData: 07/06/2025
updateData: null
keywords: 
 - trait
 - clone
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Trait Clone
Cuando queramos hacer una copia de un valor, podemos hacerlo con el trait Clone.

```rust
fn say_hello(name: String) {
    println!("Hola {name}")
}

fn main() {
    let name = String::from("Alice");
    say_hello(name.clone());
    say_hello(name);
}
```

La función de Clone es poder encontrar fácilmente dónde se producen las asignaciones al heap. Busca a .clone() y algunos otros como vec! o Box::new.

Es habitual “clonar para salir” de los problemas con el verificador de préstamos y volver más tarde para optimizar esos clones.

clone generalmente realiza una copia a fondo del valor. Por ejemplo, si clonas un array, todos los elementos del array tambien son clonados.

El comportamiento de clone es definido por el usuario, entonces puede realizar lógica personalizada de clonación si es necesario.

language&>es-ES<&