Ejercicio: secuencia de Collatz
La secuencia de Collatz se define de la siguiente manera, para n1 arbitrario mayor que cero:

Si _ni_es 1, la secuencia termina en ni.
Si ni es par, ni+1 = ni / 2.
Si ni es impar, ni+1 = 3 * ni + 1.
Por ejemplo, empezando con n1 = 3:

3 es impar, entonces n2 = 3 * 3 + 1 = 10;
10 is par, entonces n3 = 10 / 2 = 5;
5 es impar, entonces n4 = 3 * 5 + 1 = 16;
16 es par, entonces n5 = 16 / 2 = 8;
8 es par, entonces n6 = 8 / 2 = 4;
44 es par, entonces n7 = 4 / 2 = 2;
2 es par, entonces n8 = 1; and
la secuencia finaliza.
Escribe una función para calcular la longitud de la secuencia de Collatz para un número n inicial dado.

```rust

/// Determina la longitud de la secuencia de Collatz que empieza por `n`.
fn collatz_length(mut n: i32) -> u32 {
  todo!("Implementar esto")
}

fn main() {
  todo!("Implementar esto")
}
```