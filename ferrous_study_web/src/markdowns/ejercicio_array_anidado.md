---
key: 33
name: ejercicio_array_anidado
addData: 26/05/2025
updateData: null
keywords: 
 - ejercicio
 - array
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: arrays anidados
Los arrays pueden contener otros arrays:

```rust
&title><title&
&>notplay
let array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
```

¿Cuál es el tipo de esta variable?

Usa el método anterior para escribir una función transpose que transpone una matriz (convierte filas en columnas):

```rust
&title><title&
&>notplay
&>notcopy
          ⎛⎡ 1 2 3 ⎤⎞    ⎡1 4 7⎤
transpose ⎜⎟ 4 5 6 ⎢⎢ == ⎥2 5 8⎥
          ⎝⎣ 7 8 9 ⎦⎠    ⎣3 6 9⎦

```


Copia el siguiente fragmento de código en https://play.rust-lang.org/ e implementa la función. Esta función solo opera sobre matrices 3x3.

```rust
&title><title&
// TODO: borra esto cuando termines de implementarlo.
#![allow(unused_variables, dead_code)]

fn transpose(matrix: [[i32; 3]; 3]) -> [[i32; 3]; 3] {
    unimplemented!()
}

#[test]
fn test_transpose() {
    let matrix = [
        [101, 102, 103], //
        [201, 202, 203],
        [301, 302, 303],
    ];
    let transposed = transpose(matrix);
    assert_eq!(
        transposed,
        [
            [101, 201, 301], //
            [102, 202, 302],
            [103, 203, 303],
        ]
    );
}

fn main() {
    let matrix = [
        [101, 102, 103], // <-- el comentario hace que rustfmt añade una nueva línea
        [201, 202, 203],
        [301, 302, 303],
    ];

    println!("matriz: {:#?}", matrix);
    let transposed = transpose(matrix);
    println!("traspuesto: {:#?}", transposed);
}
```
language&>es-ES<&