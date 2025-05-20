## Macros
Las macros se amplían a código de Rust durante la compilación y pueden adoptar un número variable de argumentos. Se distinguen por utilizar un símbolo ! al final. La biblioteca estándar de Rust incluye una serie de macros útiles.

println!(format, ..) imprime una linea a la salida estándar (“standard output”), aplicando el formato descrito en std::fmt.
format!(format, ..) funciona igual que println!, pero devuelve el resultado en forma de cadena.
dbg!(expression) registra el valor de la expresión y lo devuelve.
todo!() marca un fragmento de código como no implementado todavía. Si se ejecuta, activará un error pánico.
unreachable!() marca un fragmento de código como inaccesible. Si se ejecuta, activará un error pánico.

```rust
fn factorial(n: u32) -> u32 {
    let mut product = 1;
    for i in 1..=n {
        product *= dbg!(i);
    }
    product
}

fn fizzbuzz(n: u32) -> u32 {
    todo!()
}

fn main() {
    let n = 4;
    println!("{n}! = {}", factorial(n));
}
```

This slide should take about 2 minutes.
El objetivo de esta sección es mostrar que existen estos elementos útiles y cómo usarlos. Por qué se definen como macros y a qué se expanden no es muy importante.

En el curso no se imparte la definición de macros, pero en una sección posterior se describirá el uso de las macros de derivación.