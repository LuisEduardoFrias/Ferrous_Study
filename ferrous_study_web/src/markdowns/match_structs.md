---
key: 78
name: match_struts
addData: 06/06/2025
updateData: null
keywords: 
 - match
 - structs
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Structs
Al igual que las tuplas, las estructuras se pueden desestructurar con la coincidencia:

```rust
struct Foo {
    x: (u32, u32),
    y: u32,
}

#[rustfmt::skip]
fn main() {
    let foo = Foo { x: (1, 2), y: 3 };
    match foo {
        Foo { x: (1, b), y } => println!("x.0 = 1, b = {b}, y = {y}"),
        Foo { y: 2, x: i }   => println!("y = 2, x = {i:?}"),
        Foo { y, .. }        => println!("y = {y}, se han ignorado otros campos"),
    }
}
```

Cambia los valores literales de foo para que coincidan con los demás patrones.
Añade un campo nuevo a Foo y realiza los cambios necesarios en el patrón.
La diferencia entre una captura y una expresión constante puede ser difícil de detectar. Prueba a cambiar el 2 del segundo brazo por una variable y
observa que no funciona. Cámbialo a const y verás que vuelve a funcionar.
language&>es-ES<&