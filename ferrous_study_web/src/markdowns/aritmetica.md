Aritmética

```rust 

fn interproduct(a: i32, b: i32, c: i32) -> i32 {
    return a * b + b * c + c * a;
}

fn main() {
    println!("resultado: {}", interproduct(120, 100, 248));
}

```

Speaker Notes
This slide should take about 3 minutes.
Es la primera vez que vemos una función distinta a main, pero el significado debería quedar claro: utiliza tres números enteros y devuelve uno. Más adelante, hablaremos sobre las funciones con más profundidad.

La aritmética es muy similar a otros idiomas, al igual que su precedencia.

¿Qué pasa con el desbordamiento de enteros? En C y C++, el desbordamiento de números enteros con signo no está definido, y podría tener diferentes resultados en diferentes plataformas o compiladores. En Rust sí está definido.

Cambia el i32 a i16 para observar un desbordamiento de un número entero, lo que da error (pánico) en una versión de depuración, pero lo envuelve en una compilación de lanzamiento. Hay otras opciones disponibles, como el desbordamiento, la saturación y el acarreo, a las que se accede mediante la sintaxis del método, por ejemplo, (a * b).saturating_add(b * c).saturating_add(c * a).

De hecho, el compilador detectará si existe un desbordamiento de expresiones constantes, por ello el ejemplo requiere una función independiente.