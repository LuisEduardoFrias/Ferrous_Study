## Etiquetas
De forma opcional, tanto continue como break pueden utilizar un argumento de etiqueta para interrumpir los bucles anidados:

```rust
fn main() {
    let s = [[5, 6, 7], [8, 9, 10], [21, 15, 32]];
    let mut elements_searched = 0;
    let target_value = 10;
    'outer: for i in 0..=2 {
        for j in 0..=2 {
            elements_searched += 1;
            if s[i][j] == target_value {
                break 'outer;
            }
        }
    }
    print!("elementos travesados: {elements_searched}");
}
```

Ten en cuenta que loop es la única construcción de bucle que devuelve un valor no trivial. Esto se debe a que es inevitable que se introduzca al menos una vez (a diferencia de los bucles while y for).