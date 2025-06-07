---
key: 133
name: mutabiblidad_interior
addData: 07/06/2025
updateData: null
keywords: 
 - mutabiblidad_ de nterior
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Mutabilidad Interior
En algunas situaciones, es necesario modificar los datos subyacentes a una referencia compartida (de solo lectura). Por ejemplo, una estructura de datos compartida puede contar con una caché interna y pretender actualizarla con métodos de solo lectura.

El patrón “mutabilidad interior” permite el acceso exclusivo (mutable) desde una referencia compartida. La biblioteca estándar ofrece varias formas de hacerlo y, al mismo tiempo, garantiza la seguridad, normalmente mediante una comprobación del tiempo de ejecución.

RefCell

```rust
use std::cell::RefCell;

fn main() {
    // Nota que `cell` NO es declarado como mutable.
    let cell = RefCell::new(5);

    {
        let mut cell_ref = cell.borrow_mut();
        *cell_ref = 123;

        // Esto causa un error al tiempo de ejecución.
        // let other = cell.borrow();
        // println!("{}", *other);
    }

    println!("{cell:?}");
}
```

Cell
Cell envuelve un valor y permite obtenerlo o definirlo, incluso con una referencia compartida a Cell. Sin embargo, no permite obtener referencias al valor. Como no hay referencias, las reglas de préstamos no pueden quebrantarse.

```rust
use std::cell::Cell;

fn main() {
    // Nota que `cell` NO es declarado como mutable.
    let cell = Cell::new(5);

    cell.set(123);
    println!("{}", cell.get());
}
```

Lo más importante de esta diapositiva es que Rust ofrece formas seguras de modificar los datos subyacentes a una referencia compartida. Hay varias formas de garantizar la seguridad, como RefCell y Cell.

RefCell implementa las reglas de préstamos habituales de Rust (varias referencias compartidas o una única referencia exclusiva) con una comprobación del tiempo de ejecución. En este caso, todos los préstamos son muy cortos y nunca se solapan, por lo que las comprobaciones siempre se llevan a cabo de forma correcta.

El bloque extra en el ejemplo RefCell existe para terminar el préstamo creado por la llamada a borrow_mut antes de que imprimimos cal celda. Intentando imprimir una celda RefCell solo enseña el mensaje "{borrowed}".
Cell es un medio más sencillo de garantizar la seguridad: tiene un método set que utiliza &self. No es necesario comprobar el tiempo de ejecución, pero sí es necesario transferir los valores, lo que puede tener su propio coste.

Ambos RefCell y Cell son !Sync, que significa que &RefCell y &Cell no pueden ser pasados entre hilos. Esto previene que dos hilos intenten acceder la
celda al mismo tiempo.
language&>es-ES<&