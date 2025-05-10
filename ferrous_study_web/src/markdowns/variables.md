Variables
Rust ofrece seguridad de tipos mediante tipado estático. Los enlaces a variables son hechos con let:

```rust
fn main() {
    let x: i32 = 10;
    println!("x: {x}");
    // x = 20;
    // println!("x: {x}");
}
```


Speaker Notes
This slide should take about 5 minutes.
Elimina el comentario de x = 20 para demostrar que las variables son inmutables de forma predeterminada. Añade la palabra clave mut para que se puedan hacer cambios.

En este ejemplo, i32 es el tipo de la variable. Se debe conocer durante el tiempo de compilación, pero la inferencia de tipos (véase más adelante)
permite al programador omitirla en muchos casos