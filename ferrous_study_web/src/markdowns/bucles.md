## Bucles while
La palabra clave while es muy similar a la de otros lenguajes y ejecuta el cuerpo del bucle mientras que la condición sea valida.

```rust
fn main() {
    let mut x = 200;
    while x >= 10 {
        x = x / 2;
    }
    println!("x final: {x}");
}
```