---
key: 71
name: introduccion_modulo
addData: 3/07/2025
updateData: null
keywords: 
 - modulos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Módulos
Hemos visto cómo los bloques impl nos permiten asignar espacios de nombres de funciones a un tipo.

Del mismo modo, mod nos permite asignar espacios de nombres a funciones y tipos:

```rust
mod foo {
    pub fn do_something() {
        println!("En el módulo foo");
    }
}

mod bar {
    pub fn do_something() {
        println!("En el módulo bar");
    }
}

fn main() {
    foo::do_something();
    bar::do_something();
}
```

Los paquetes ofrecen funciones e incluyen un archivo Cargo.toml que describe cómo compilar un paquete de más de un crate.
Los crates son un árbol de módulos, donde un crate binario crea un ejecutable y un crate de biblioteca compila una biblioteca.
Los módulos definen la organización y el ámbito, y son el centro de esta sección.
language&>es-ES<&