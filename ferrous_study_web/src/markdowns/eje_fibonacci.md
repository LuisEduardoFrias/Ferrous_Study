Ejercicio: Fibonacci
La secuencie de Fibonacci empieza con [0, 1]. Para n>1, el número de Fibonacci en la posición n se calcula de forma recursiva como la suma de los números de Fibonacci n-1 y n-2.

Escribe una función fib(n) que calcule el número n de Fibonacci. ¿Cuándo da error pánico esta función?

```rust
fn fib(n: u32) -> u32 {
    if n < 2 {
        // El caso base.
        todo!("Implementar esto")
    } else {
        // El caso recursivo.
        todo!("Implementar esto")
    }
}

fn main() {
    let n = 20;
    println!("fib({n}) = {}", fib(n));
}

```