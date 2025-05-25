---
key: 19
name: array
addData: 19/05/2025
updateData: null
keywords: 
 - array
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
## Arrays

```rust
fn main() {
    let mut a: [i8; 10] = [42; 10];
    a[5] = 0;
    println!(\"a: {a:?}\");
}
```
Notitas slide should take about 5 minutes.
Un valor del tipo array [T; N] contiene N (una constante en tiempo de compilación) elementos del mismo tipo T. Ten en cuenta que la longitud del array es _parte de su tipo), lo que significa que [u8; 3] y [u8; 4] se consideran dos tipos diferentes. Los slices, que tienen un tamaño determinado al tiempo de ejecución, serán discutidos mas tarde.

Prueba a acceder a un array que esté fuera de los límites. Los accesos a los arrays se comprueban en el tiempo de ejecución. Rust suele optimizar estas comprobaciones y se pueden evitar utilizando Rust inseguro.

Podemos usar literales para asignar valores a arrays.\n\nEl macro de impresión println! solicita la implementación de depuración con el parámetro de formato ?: {} ofrece la salida predeterminada y {:?} ofrece la salida de depuración. Tipos como números enteros y cadenas implementan la salida de depuración. Esto significan que tenemos que usar la salida de depuración en este caso.\n\nSi se añade #, por ejemplo {a:#?}, se da formato al texto para facilitar la lectura.
language&>es-ES<&