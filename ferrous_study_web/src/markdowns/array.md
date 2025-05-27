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
# Arrays

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

## Iteración de Arreglos (Arrays)
La instrucción for permite iterar sobre arrays, pero no sobre tuplas.

```rust
&title><title&
fn main() {
    let primes = [2, 3, 5, 7, 11, 13, 17, 19];
    for prime in primes {
        for i in 2..prime {
            assert_ne!(prime % i, 0);
        }
    }
}
```

Esta función usa el trait IntoIterator, pero aún no lo hemos estudiado.

La macro assert_ne! es nueva. También existen las macros assert_eq! y assert!. Estas variantes siempre se comprueban mientras las variantes de solo depuración, como debug_assert!, no compilan nada en las compilaciones de lanzamiento.

## Patrones y Desestructuración

Cuando uno trabaja con tuplas y otros valores estructurados, es común querer extraer valores interiores a variables locales. Uno puede manualmente acceder los valores interiores:

```rust
&title><title&
fn print_tuple(tuple: (i32, i32)) {
    let left = tuple.0;
    let right = tuple.1;
    println!("left: {left}, right: {right}");
}
```

Rust también provee la coincidencia de patrones para destructurar un valor en sus partes constituyentes:

```rust
&title><title&
fn print_tuple(tuple: (i32, i32)) {
    let (left, right) = tuple;
    println!("left: {left}, right: {right}");
}
```

Los patrones usados aquí son “irrefutables”, es decir que el compilador puede estáticamente verificar que el valor a la derecha del = tiene la misma estructura que el patrón.
Un nombre de variable es un patrón irrefutable que siempre coincide con cualquier valor, así que también podemos usar let para declarar una sola variable.
Los patrones también se pueden usar en los condicionales, dejando que la comparación de igualdad y el desestructuramiento ocurren al mismo tiempo. Esta forma de coincidencia de patrones sera discutido mas a fondo mas tarde.
Edita los ejemplos anteriores para enseñar el error de compilador cuando el patrón no coincide con el valor.

language&>es-ES<&