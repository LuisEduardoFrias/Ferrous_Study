---
key: 107
name: comparaciones_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - comparaciones
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Comparaciones
Estos traits permiten comparar valores. Se pueden derivar todos los traits de los tipos que contengan campos que implementen estos traits.

PartialEq y Eq
PartialEq es una relación de equivalencia parcial, con el método requerido eq y el método proporcionado ne. Los operadores == y != llamarán a estos métodos.

```rust
struct Key {
    id: u32,
    metadata: Option<String>,
}
impl PartialEq for Key {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}
```

Eq es una relación de equivalencia completa (reflexiva, simétrica y transitiva) e implica PartialEq. Las funciones que requieren una equivalencia total usan Eq como límite del trait.

PartialOrd y Ord
PartialOrd define un orden parcial, con un método partial_cmp. Se usa para implementar los operadores <, <=, >= y >.

```rust
use std::cmp::Ordering;
#[derive(Eq, PartialEq)]
struct Citation {
    author: String,
    year: u32,
}
impl PartialOrd for Citation {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        match self.author.partial_cmp(&other.author) {
            Some(Ordering::Equal) => self.year.partial_cmp(&other.year),
            author_ord => author_ord,
        }
    }
}
```

Ord es un orden total en el que cmp devuelve Ordering.

PartialEq se puede implementar entre diferentes tipos, pero Eq no, ya que es reflexivo:

```rust
struct Key {
    id: u32,
    metadata: Option<String>,
}
impl PartialEq<u32> for Key {
    fn eq(&self, other: &u32) -> bool {
        self.id == *other
    }
}
```

En la práctica, es habitual derivar estos traits, aunque no se suelen implementar.
language&>es-ES<&