---
key: 35
name: slice
addData: 19/05/2025
updateData: null
keywords: 
 - slice
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Slices
Un slice ofrece una visión de una colección más amplia:

Los slices toman prestados datos del tipo slice.
Pregunta: ¿Qué ocurre si se modifica a[3] justo antes de imprimir s?

```rust
fn main() {
    let mut a: [i32; 6] = [10, 20, 30, 40, 50, 60];
    println!("a: {a:?}");

    let s: &[i32] = &a[2..4];

    println!("s: {s:?}");
}
```

Creamos un slice tomando prestado a y especificando entre paréntesis los índices de inicio y de fin.

Si el slice comienza en el índice 0, la sintaxis de rango de Rust nos permite eliminar el índice inicial, lo que significa que &a[0..a.len()] y &a[..a.len()] son idénticos.

Lo mismo ocurre con el último índice, por lo que &a[2..a.len()] y &a[2..] son idénticos.

Para crear fácilmente un slice del array completo, podemos usar &a[..].

s es una referencia a un slice de i32s. Ten en cuenta que el tipo de s (&[i32]) ya no menciona la longitud del array. Esto nos permite realizar cálculos en slices de diferentes tamaños.

Los slices siempre tienen préstamos de otros objetos. En este ejemplo, a tiene que permanecer “vivo” (en el ámbito) al menos durante el tiempo que dure el slice.

La cuestión sobre la modificación de a[3] puede suscitar un debate interesante, pero la respuesta es que, por razones de seguridad de memoria, no se
puede hacer mediante a en este punto de la ejecución, pero sí se pueden leer los datos de a y s de forma segura. Funciona antes de crear el slice y
después de println, cuando el slice ya no se utiliza.
language&>es-ES<&