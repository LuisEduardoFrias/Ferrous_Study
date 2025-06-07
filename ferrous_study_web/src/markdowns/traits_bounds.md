---
key: 93
name: traits_bounds
addData: 06/06/2025
updateData: null
keywords: 
 - trait
 - bounds
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Trait Bounds
Cuando se trabaja con genéricos, a menudo se prefiere que los tipos implementen algún trait, de forma que se pueda llamar a los métodos de este trait.

Puedes hacerlo con T: Trait o impl Trait:

```rust
fn duplicate<T: Clone>(a: T) -> (T, T) {
    (a.clone(), a.clone())
}

// struct NotClonable;

fn main() {
    let foo = String::from("foo");
    let pair = duplicate(foo);
    println!("{pair:?}");
}
```

Prueba a crear un NonClonable y pásalo a duplicable.

Si se necesitan varios traits, usa + para unirlos.

Muestra una cláusula where para que los alumnos la encuentren al leer el código.

```rust
fn duplicate<T>(a: T) -> (T, T)
where
    T: Clone,
{
    (a.clone(), a.clone())
}
```

Despeja la firma de la función si tienes muchos parámetros.
Tiene funciones adicionales para que sea más potente.
Si alguien pregunta, la función adicional es que el tipo que está a la izquierda de “:” puede ser arbitrario, como Option<T>.
Ten en cuenta que Rust (todavía) no admite especialización. Por ejemplo, dado el duplicate, original, no es válido añadir un duplicate(a: u32)
especializado.
language&>es-ES<&