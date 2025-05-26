---
key: 12
name: solucion_fibonacci
addData: 19/05/2025
updateData: null
keywords: 
 - solución
 - fibonacci
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución fibonacci

```rust
fn fib(n: u32) -> u32 {
    if n < 2 {
        return n;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}

fn main() {
    let n = 20;
    println!("fib({n}) = {}", fib(n));
}

```
language&>es-ES<&