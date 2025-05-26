---
key: 17
name: break_continue
addData: 19/05/2025
updateData: null
keywords: 
 - break
 - continue
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# break y continue
Si quieres iniciar inmediatamente la siguiente iteración, usa continue.

Si quieres salir de un bucle antes de que termine, usa break. Para loop, este puede tomar una expresión opcional que se vuelve el valor de la expresión loop.

```rust
fn main() {
    let mut i = 0;
    loop {
        i += 1;
        if i > 5 {
            break;
        }
        if i % 2 == 0 {
            continue;
        }
        println!("{}", i);
    }
}
```
language&>es-ES<&