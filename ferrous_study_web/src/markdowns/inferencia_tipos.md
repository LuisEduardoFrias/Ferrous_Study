Inferencia de tipos
Rust consultará cómo se usa la variable para determinar el tipo:

```rust
fn takes_u32(x: u32) {
    println!("u32: {x}");
}

fn takes_i8(y: i8) {
    println!("i8: {y}");
}

fn main() {
    let x = 10;
    let y = 20;

    takes_u32(x);
    takes_i8(y);
    // takes_u32(y);
}
```

Speaker Notes
This slide should take about 3 minutes.
Esta diapositiva muestra cómo el compilador de Rust infiere tipos basándose en restricciones proporcionadas por declaraciones y usos de variables.

Es muy importante subrayar que las variables que se declaran así no son de un “tipo cualquiera” dinámico que pueda contener cualquier dato. El código máquina generado por tal declaración es idéntico a la declaración explícita de un tipo. El compilador hace el trabajo por nosotros y nos ayuda a escribir código más conciso.

Cuando ningún elemento restringe el tipo de un literal entero, Rust lo define de forma predeterminada como i32. A veces aparece como {integer} en los mensajes de error. Del mismo modo, los literales de punto flotante se definen como f64 de forma predeterminada.

fn main() {
    let x = 3.14;
    let y = 20;
    assert_eq!(x, y);
    // ERROR: no hay implementación para `{float} == {integer}`
}