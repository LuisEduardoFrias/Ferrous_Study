---
key: 96
name: tipo_datos_genericos.md
addData: 06/06/2025
updateData: null
keywords: 
 - genericos
 - tipos de datos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Tipos de Datos Genéricos
Puedes usar genéricos para abstraer el tipo de campo concreto:

```rust
#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn coords(&self) -> (&T, &T) {
        (&self.x, &self.y)
    }

    fn set_x(&mut self, x: T) {
        self.x = x;
    }
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
    println!("{integer:?} y {float:?}");
    println!("coordenadas: {:?}", integer.coords());
}
```

P: ¿Por qué T se especifica dos veces en impl<T> Point<T> {}? ¿No es redundante?

Esto se debe a que es una sección de implementación genérica para un tipo genérico. Son genéricos de forma independiente.
Significa que estos métodos están definidos para cualquier T.
Es posible escribir impl Point<u32> { .. }.
Point sigue siendo genérico y puedes usar Point<f64>, pero los métodos de este bloque solo estarán disponibles para Point<u32>.
Prueba a declarar una nueva variable let p = Punto { x: 5, y: 10.0 };. Actualiza el código para permitir que haya puntos que tengan elementos de
diferentes tipos con dos variables de tipo, por ejemplo, T y U.

language&>es-ES<&