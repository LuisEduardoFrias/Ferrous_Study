---
key: 108
name: operadores_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - operadores
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Operadores
La sobrecarga de operadores se implementa mediante traits en std::ops:

```rust
#[derive(Debug, Copy, Clone)]
struct Point {
    x: i32,
    y: i32,
}

impl std::ops::Add for Point {
    type Output = Self;

    fn add(self, other: Self) -> Self {
        Self { x: self.x + other.x, y: self.y + other.y }
    }
}

fn main() {
    let p1 = Point { x: 10, y: 20 };
    let p2 = Point { x: 100, y: 200 };
    println!("{:?} + {:?} = {:?}", p1, p2, p1 + p2);
}
```

Cuestiones de debate:

¿En qué situaciones sería útil implementar Add para &Point?
Respuesta: Add:add consume a self. Si el tipo T para el que se sobrecarga el operador no es Copy, deberías plantearte también sobrecargar el operador para &T. Así se evita la clonación innecesaria en el sitio de la llamada.
¿Por qué Output es un tipo asociado? ¿Se podría convertir en un parámetro tipo del método?
Respuesta corta: el llamador controla los parámetros tipo de la función, pero los tipos asociados (como Output) son controlados por el implementador de un trait.
Se podría implementar Add para dos tipos distintos; por ejemplo, impl Add<(i32, i32)> for Point añadiría una tupla a un Point.
language&>es-ES<&