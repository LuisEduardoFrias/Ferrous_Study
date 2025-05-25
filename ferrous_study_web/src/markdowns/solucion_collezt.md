---
key: 18
name: solucion_collezt
addData: 19/05/2025
updateData: null
keywords: 
 - solución
 - collezt
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
### Solución

```rust

/// Determina la longitud de la secuencia de Collatz que empieza por `n`.
fn collatz_length(mut n: i32) -> u32 {
    let mut len = 1;
    while n > 1 {
        n = if n % 2 == 0 { n / 2 } else { 3 * n + 1 };
        len += 1;
    }
    len
}

#[test]
fn test_collatz_length() {
    assert_eq!(collatz_length(11), 15);
}

fn main() {
    println!("Longitud: {}", collatz_length(11));
}
```
language&>es-ES<&