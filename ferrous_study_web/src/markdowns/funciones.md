## Funciones

```rust
fn gcd(a: u32, b: u32) -> u32 {
    if b > 0 {
        gcd(b, a % b)
    } else {
        a
    }
}

fn main() {
    println!("gcd: {}", gcd(143, 52));
}
```

This slide should take about 3 minutes.
Los parámetros de declaración van seguidos de un tipo (al contrario que en algunos lenguajes de programación) y, a continuación, de un tipo de resultado devuelto.
La última expresión del cuerpo de una función (o de cualquier bloque) se convierte en el valor devuelto. Basta con omitir el carácter ; al final de la expresión. La palabra clave return puede ser utilizado para devolver valores antes del fin de la función, pero la sintaxis de “valor desnudo” es idiomático al fin de una función.
Algunas funciones no devuelven ningún valor, devuelven el “tipo unitario”, (). El compilador deducirá esto si se omite el tipo de retorno -> ().
El sobrecargo de funciones no existe en Rust – cada función tiene una única implementación.
Siempre toma un número fijo de parámetros. No se admiten argumentos predeterminados. Las macros se pueden utilizar para admitir funciones variádicas.
Siempre se utiliza un solo conjunto de tipos de parámetros. Estos tipos pueden ser genéricos, lo cual discutiremos mas tarde.