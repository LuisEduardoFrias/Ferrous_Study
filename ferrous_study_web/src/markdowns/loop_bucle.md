---
key: 3
name: loop_bucle
addData: 19/05/2025
updateData: null
keywords: 
 - loop
 - bucle
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
## loop
El bucle loop repite hasta encontrar un break.

```rust
fn main() {
    let mut i = 0;
    loop {
        i += 1;
        println!("{i}");
        if i > 100 {
            break;
        }
    }
}
```
language&>es-ES<&