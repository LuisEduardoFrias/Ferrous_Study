---
key: 67
name: intoiterator
addData: 3/07/2025
updateData: null
keywords: 
 - iteradores
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# IntoIterator
El trait Iterator te indica cómo iterar una vez que has creado un iterador. El trait relacionado IntoIterator indica cómo crear un iterador para un tipo. Es usado automáticamente por los bucles for.


```rust
struct Grid {
    x_coords: Vec<u32>,
    y_coords: Vec<u32>,
}

impl IntoIterator for Grid {
    type Item = (u32, u32);
    type IntoIter = GridIter;
    fn into_iter(self) -> GridIter {
        GridIter { grid: self, i: 0, j: 0 }
    }
}

struct GridIter {
    grid: Grid,
    i: usize,
    j: usize,
}

impl Iterator for GridIter {
    type Item = (u32, u32);

    fn next(&mut self) -> Option<(u32, u32)> {
        if self.i >= self.grid.x_coords.len() {
            self.i = 0;
            self.j += 1;
            if self.j >= self.grid.y_coords.len() {
                return None;
            }
        }
        let res = Some((self.grid.x_coords[self.i], self.grid.y_coords[self.j]));
        self.i += 1;
        res
    }
}

fn main() {
    let grid = Grid { x_coords: vec![3, 5, 7, 9], y_coords: vec![10, 20, 30, 40] };
    for (x, y) in grid {
        println!("punto = {x}, {y}");
    }
}
```

Haz clic para leer la documentación para IntoIterator. Cada implementación de IntoIterator debe declarar dos tipos:

Item: el tipo sobre el que iteramos, como i8,
IntoIter: el tipo Iterator devuelto por el método into_iter.
Ten en cuenta que IntoIter y Item están vinculados: el iterador debe tener el mismo tipo de Item, lo que significa que devuelve Option<Item>.

En el ejemplo se itera sobre todas las combinaciones de las coordenadas x e y.

Prueba a iterar sobre la cuadrícula dos veces en main. ¿Por qué no funciona? Ten en cuenta que IntoIterator::into_iter tiene la propiedad de self.

Soluciona este problema implementando IntoIterator para &Grid y almacenando una referencia a Grid en GridIter.

Lo mismo puede ocurrir con los tipos de biblioteca estándar: for e in some_vector adquirirá la propiedad de some_vector e iterará sobre los elementos
propios de ese vector. En su lugar, puedes utilizar for e in &some_vector para iterar sobre referencias a elementos de some_vector.
language&>es-ES<&