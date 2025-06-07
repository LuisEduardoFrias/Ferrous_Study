---
key: 125
name: box
addData: 07/06/2025
updateData: null
keywords: 
 - box
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Box<T>
Box es un puntero propio de datos en el heap:

```rust
fn main() {
    let five = Box::new(5);
    println!("cinco: {}", *five);
}
```

```bath
&>notcopy
&>notplay
+------------------+     +---------+
|      Stack       |     |   Heap  |
|------------------|     |---------|
|  five            |     |         |
|  +------------+  |     |  +---+  |
|  |     o------|--|-----|->| 5 |  |
|  +------------+  |     |  +---+  |
|                  |     |         |
+------------------+     +---------+

```

Box<T> implementa Deref<Target = T>, lo que significa que puedes llamar a métodos desde T directamente en un Box<T>.

Los tipos de datos recursivos o los tipos de datos con tamaños dinámicos deben utilizar un Box:

```rust
#[derive(Debug)]
enum List<T> {
    /// Una lista no vacía: el primer elemento y el resto de la lista.
    Element(T, Box<List<T>>),
    /// Una lista vacía.
    Nil,
}

fn main() {
    let list: List<i32> =
        List::Element(1, Box::new(List::Element(2, Box::new(List::Nil))));
    println!("{list:?}");
}
```

```bath
&>notcopy
&>notplay
+-----------------------------+    +-----------------------------------------------------+
|           Stack             |    |                       Heap                          |
|-----------------------------|    |-----------------------------------------------------|
|  list                       |    |                                                     |
|  +-----------+-----+-----+  |    |   +-----------+-----+-----+    +-------+----+----+  |
|  |  element  |  1  |  o--|--|----|-->|  element  |  2  |  o--|--->|  Nil  | // | // |  |
|  +-------+---+-----+-----+  |    |   +-----------+-----+-----+    +-------+----+----+  |
|                             |    |                                                     |
+-----------------------------+    +-----------------------------------------------------+

```

Box es igual que std::unique_ptr en C++, salvo que está asegurado que no será nulo.

Un Box puede resultar útil en los siguientes casos:

tiene un tipo cuyo tamaño no se conoce durante la compilación, pero el compilador de Rust quiere saber el tamaño exacto.
quieres transferir la propiedad (“ownership”) de una gran cantidad de datos. Para evitar que se copien grandes cantidades de datos en el stack, almacena los datos del heap en un Box para que solo se mueva el puntero.
Si no utilizamos Box e intentamos insertar un List directamente dentro de List, el compilador no podría calcular un tamaño fijo de la estructura en la memoria (List tendría un tamaño infinito).

Box resuelve este problema, ya que tiene el mismo tamaño que un puntero normal y solo apunta al siguiente elemento de la List en el heap.

Elimina Box de la definición de la lista y muestra el error del compilador. El mensaje “recursivo con indirección” es una sugerencia de que debes usar un Box o referencia de algún tipo en lugar de almacenar un valor directamente.

Más información
Optimización de la Memoria
Aunque Box se parece a std::unique_ptr en C++, no puede ser vació o nulo. Esto hace Box uno de los tipos que permite que el compilador optimice el almacenaje de ciertas enumeraciones.

Por ejemplo, Option<Box<T>> tiene el mismo tamaño que Box<T>, ya que el compilador usa el valor nulo para discriminar variantes en vez de usar una etiqueta explicita (“Null Pointer Optimization”):

```rust
use std::mem::size_of_val;

struct Item(String);

fn main() {
    let just_box: Box<Item> = Box::new(Item("Solo box".into()));
    let optional_box: Option<Box<Item>> =
        Some(Box::new(Item("Box opcional".into())));
    let none: Option<Box<Item>> = None;

    assert_eq!(size_of_val(&just_box), size_of_val(&optional_box));
    assert_eq!(size_of_val(&just_box), size_of_val(&none));

    println!("Tamaño de just_box: {}", size_of_val(&just_box));
    println!("Tamaño de optional_box: {}", size_of_val(&optional_box));
    println!("Tamaño de none: {}", size_of_val(&none));
}
```

language&>es-ES<&