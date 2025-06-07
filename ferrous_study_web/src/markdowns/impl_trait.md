---
key: 94
name: impl_traits
addData: 06/06/2025
updateData: null
keywords: 
 - impl traits
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
impl Trait
De forma similar a los límites de traits, se puede usar la sintaxis impl Trait en argumentos de funciones y valores devueltos:

```rust
// Azúcar sintáctico para:
//   fn add_42_millions<T: Into<i32>>(x: T) -> i32 {
fn add_42_millions(x: impl Into<i32>) -> i32 {
    x.into() + 42_000_000
}

fn pair_of(x: u32) -> impl std::fmt::Debug {
    (x + 1, x - 1)
}

fn main() {
    let many = add_42_millions(42_i8);
    println!("{many}");
    let many_more = add_42_millions(10_000_000);
    println!("{many_more}");
    let debuggable = pair_of(27);
    println!("depurable: {debuggable:?}");
}
```

impl Trait te deja trabajar con tipos que no puedes nombrar. El significado de impl Trait es un poco diferente dependiendo de su posición.

En el caso de los parámetros, impl Trait es como un parámetro genérico anónimo con un límite de trait.

En el caso de un tipo de resultado devuelto, significa que este es un tipo concreto que implementa el trait, sin nombrar el tipo. Esto puede ser útil cuando no quieres exponer el tipo concreto en una API pública.

La inferencia es más complicada en la posición de retorno. Una función que devuelve impl Foo elige el tipo concreto que devuelve, sin escribirlo en el código fuente. Una función que devuelve un tipo genérico como collect<B>() -> B puede devolver cualquier tipo que cumpla B, y es posible que el llamador tenga que elegir uno, como con let x: Vec<_> = foo.collect() o con la sintaxis turbofish, foo.collect::<Vec<_>>().

¿Cuál es el tipo de debuggable? Prueba con let debuggable: () = .. para ver lo que muestra el mensaje de error.
language&>es-ES<&