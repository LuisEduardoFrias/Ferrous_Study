---
key: 98
name: solucion_min_generico
addData: 06/06/2025
updateData: null
keywords: 
 - solución
 - min_generico
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución

```rust
use std::cmp::Ordering;

fn min<T: Ord>(l: T, r: T) -> T {
    match l.cmp(&r) {
        Ordering::Less | Ordering::Equal => l,
        Ordering::Greater => r,
    }
}

fn main() {
    assert_eq!(min(0, 10), 0);
    assert_eq!(min(500, 123), 123);

    assert_eq!(min('a', 'z'), 'a');
    assert_eq!(min('7', '1'), '1');

    assert_eq!(min("hola", "adios"), "adios");
    assert_eq!(min("murciélago", "armadillo"), "armadillo");
```
language&>es-ES<&