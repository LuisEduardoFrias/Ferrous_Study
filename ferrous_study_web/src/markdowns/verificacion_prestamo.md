---
key: 131
name: verificacion_prestamo
addData: 07/06/2025
updateData: null
keywords: 
 - verificación de prestamo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Verificación de Préstamos
El borrow checker de Rust limita las formas en que se pueden tomar prestados valores. Para un dado valor, en cualquier tiempo:

Puedes tener uno o varios valores &T, o
Solo puedes tener exactamente una referencia exclusiva al valor.

```rust
fn main() {
    let mut a: i32 = 10;
    let b: &i32 = &a;

    {
        let c: &mut i32 = &mut a;
        *c = 20;
    }

    println!("a: {a}");
    println!("b: {b}");
}
```

Ten en cuenta que el requisito es que las referencias que están en conflicto no se encuentren en el mismo punto. No importa en el lugar en el que se desreferencie la referencia.
El código anterior no se compila porque a se toma prestada como mutable (a través de c) y como inmutable (a través de b) al mismo tiempo.
Mueve la instrucción println! de b antes del ámbito que introduce c para que el código compile.
Después de ese cambio, el compilador se da cuenta de que b solo se usa antes del nuevo préstamo mutable de a a través de c. Se trata de una función del verificador de préstamos denominada “tiempo de vida no léxico”.
La restricción de referencia exclusiva es bastante sólida. Rust la utiliza para asegurarse de que no se produzcan data races. Rust también se basa en esta restricción para optimizar el código. Por ejemplo, el valor de una referencia compartida se puede almacenar en caché de forma segura en un registro durante el tiempo de vida de dicha referencia.
El verificador de préstamos está diseñado para adaptarse a muchos patrones comunes, como tomar referencias exclusivas en diferentes campos de un
struct al mismo tiempo. Sin embargo, hay algunas situaciones en las que “no lo entiende del todo”, lo que suele dar lugar a “conflictos con el
comprobador de préstamos.”
language&>es-ES<&