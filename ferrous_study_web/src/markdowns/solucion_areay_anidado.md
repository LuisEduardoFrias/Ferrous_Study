---
key: 34
name: solucion_array_anidado
addData: 26/05/2025
updateData: null
keywords: 
 - solición
 - array anidado
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución Array anidado
<br />

```rust
&title><title&
fn transpose(matrix: [[i32; 3]; 3]) -> [[i32; 3]; 3] {
    let mut result = [[0; 3]; 3];
    for i in 0..3 {
        for j in 0..3 {
            result[j][i] = matrix[i][j];
        }
    }
    result
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