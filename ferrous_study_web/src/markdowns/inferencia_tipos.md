### Inferencia de tipos

Muchas veces no necesitas especificar explícitamente el tipo de una variable. El compilador de Rust es lo suficientemente inteligente como para inferir el tipo basándose en el valor que se le asigna o cómo se utiliza la variable.

```rust
&title><title&
fn main() {

    let x = 10; // Rust infiere que x es de tipo i32
    let y = 3.14; // Rust infiere que y es de tipo f64
    let z = true; // Rust infiere que z es de tipo bool

    let a: i64 = 10;
    let b: f32 = 3.14;

    let x = 10;
    let y = 20;
}
```

Este ejemplo muestra cómo el compilador de Rust infiere tipos basándose en restricciones proporcionadas por declaraciones y usos de variables.

Sin embargo, a veces es necesario o recomendable especificar el tipo explícitamente, especialmente cuando el compilador no tiene suficiente información o para mayor claridad en el código.

Es muy importante subrayar que las variables que se declaran así no son de un “tipo cualquiera” dinámico que pueda contener cualquier dato. El código máquina generado por tal declaración es idéntico a la declaración explícita de un tipo. El compilador hace el trabajo por nosotros y nos ayuda a escribir código más conciso.

Cuando ningún elemento restringe el tipo de un literal entero, Rust lo define de forma predeterminada como i32. A veces aparece como {integer} en los mensajes de error. Del mismo modo, los literales de punto flotante se definen como f64 de forma predeterminada.

```rust
&title><title&
fn main() {
    let x = 3.14;
    let y = 20;
    assert_eq!(x, y);
    // ERROR: no hay implementación para `{float} == {integer}`
}
```

La línea "**assert_eq!(x, y);**" intenta comparar si el valor de **x** es igual al valor de **y**. 

La función "**assert_eq!**"  es conocida como macro, identificada por el sigo de "**!**" al final del nombre, se utiliza en Rust para verificar si dos expresiones son iguales y, si no lo son, el programa entrará en pánico (deteniéndose con un mensaje de error).

// ERROR: no hay implementación para \{float} == {integer}``
Este es el error que genera el compilador. La razón fundamental es que Rust no permite la comparación directa entre un tipo de punto flotante (como f64 en este caso) y un tipo entero (como i32) sin una conversión explícita.

Los números de punto flotante y los enteros se representan de manera diferente en la memoria y tienen semánticas distintas. Compararlos directamente podría llevar a resultados inesperados o imprecisos. Por ejemplo, ¿cómo decidir si el entero 20 es "igual" al flotante 20.0.