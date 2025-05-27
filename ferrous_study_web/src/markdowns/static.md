---
key: 42
name: static
addData: 26/05/2025
updateData: null
keywords: 
 - static
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# static
Las variables estáticas vivirán durante toda la ejecución del programa y, por lo tanto, no se moverán:

```rust
static BANNER: &str = "Bienvenide a RustOS 3.14";

fn main() {
    println!("{BANNER}");
}
```

Tal y como se indica en el libro Rust RFC Book, estas no son insertadas y tienen una ubicación de memoria real asociada. Esto resulta útil para código insertado y no seguro. Además, la variable continúa durante toda la ejecución del programa. Cuando un valor de ámbito global no tiene ningún motivo para necesitar identidad de objeto, se suele preferir const.

Por su parte, static se parece a una variable global mutable en C++.
static proporciona la identidad del objeto: una dirección en la memoria y en el estado que requieren los tipos con mutabilidad interior, como Mutex<T>.
Más información
Dado que se puede acceder a las variables static desde cualquier hilo, deben ser Sync. Mutabilidad interior es posible a través de un Mutex, atómico o parecido.

Datos locales al hilo se pueden crear con el macro std::thread_local.
language&>es-ES<&