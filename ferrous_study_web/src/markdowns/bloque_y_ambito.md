## Bloques y ámbitos
### Bloques

En Rust, un bloque contiene una secuencia de expresiones rodeados por llaves {}. Cada bloque tiene el tipo y valor de la última expresión del bloque:

```rust
fn main() {
    let z = 13;
    let x = {
        let y = 10;
        println!("y: {y}");
        z - y
    };
    println!("x: {x}");
}
```

Si la última expresión termina con ;, el tipo y el valor resultante será ().

This slide and its sub-slides should take about 5 minutes.
Puedes mostrar cómo cambia el valor del bloque cambiando su última línea. Por ejemplo, añade o quita un punto y coma, o utiliza la expresión return.