---
key: 92
name: traits_genericas
addData: 06/06/2025
updateData: null
keywords: 
 - traits
 - genericos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Traits Genéricos
Los traits también pueden ser genéricos, como los tipos y las funciones. Los parámetros de un trait obtienen tipos concretos cuando es usado.

```rust
#[derive(Debug)]
struct Foo(String);

impl From<u32> for Foo {
    fn from(from: u32) -> Foo {
        Foo(format!("Convertido del numero entero: {from}"))
    }
}

impl From<bool> for Foo {
    fn from(from: bool) -> Foo {
        Foo(format!("Convertido del bool: {from}"))
    }
}

fn main() {
    let from_int = Foo::from(123);
    let from_bool = Foo::from(true);
    println!("{from_int:?}, {from_bool:?}");
}
```

El trait From sera discutido mas tarde, pero su definición en la documentación std es simple.

Las implementaciones del trait no necesitan cubrir todos los parámetros de tipo posibles. Aquí, Foo::from("hello") no compilaría porque no hay una implementación From<&str> para Foo.

Tipos genéricos toman tipos como entradas, mientras tipos asociados son tipos de salida. Un trait puede tener varias implementaciones para diferentes tipos de entrada.

De hecho, Rust requiere que a lo más solo una implementación de un trait coincida con cualquier tipo T. A diferencia de otros lenguajes, Rust no tiene
una heurística para escoger la coincidencia “más especifica”. Hay trabajo corriente para implementar esta heurística, llamado especialización.
language&>es-ES<&