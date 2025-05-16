## for 
El bucle for itera sobre rangos de valores o las entradas de una colección:

``` rust
fn main() {
    for x in 1..5 {
        println!("x: {x}");
    }

    for elem in [1, 2, 3, 4, 5] {
        println!("elem: {elem}");
    }
}
```

Los bucles for utilizan un concepto llamado “iteradores” para iterar sobre diferentes tipos de rangos/colecciones. Los iteradores serán discutidos en mas detalle mas adelante.
Ten en cuenta que el bucle for solo se itera a 4. Muestra la sintaxis 1..=5 para un intervalo inclusivo.