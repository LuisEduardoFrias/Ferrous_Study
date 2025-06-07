---
key: 104
name: hashmap_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - biblioteca estandar
 - hashmap
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# HashMap
Mapa hash estándar con protección frente a ataques HashDoS:

```rust
use std::collections::HashMap;

fn main() {
    let mut page_counts = HashMap::new();
    page_counts.insert("Las aventuras de Huckleberry Finn", 207);
    page_counts.insert("Los cuentos de los hermanos Grimm", 751);
    page_counts.insert("Orgullo y prejuicio", 303);

    if !page_counts.contains_key("Los miserables") {
        println!(
            "Tenemos información acerca de {} libros, pero no de Los miserables.",
            page_counts.len()
        );
    }

    for book in ["Orgullo y prejuicio", "Las aventuras de Alicia en el país de las maravillas"] {
        match page_counts.get(book) {
            Some(count) => println!("{book}: {count} páginas"),
            None => println!("{book} es desconocido."),
        }
    }

    // Utiliza el método .entry() para insertar un valor si no se encuentra ningún resultado.
    for book in ["Orgullo y prejuicio", "Las aventuras de Alicia en el país de las maravillas"] {
        let page_count: &mut i32 = page_counts.entry(book).or_insert(0);
        *page_count += 1;
    }

    println!("{page_counts:#?}");
}
```
HashMap no se ha explicado en el preludio y debe conocerse.

Prueba las siguientes líneas de código. La primera línea comprobará si un libro está incluido en el hashmap y, si no, devolverá un valor alternativo. La segunda línea insertará el valor alternativo en el hashmap si el libro no se encuentra.

```rust
let pc1 = page_counts
    .get("Harry Potter y la piedra filosofal")
    .unwrap_or(&336);
let pc2 = page_counts
    .entry("Los juegos del hambre".to_string())
    .or_insert(374);
```

A diferencia de vec!, por desgracia no hay ninguna macro estándar de hashmap!.

Sin embargo, desde la versión 1.56 de Rust, HashMap implementa [From<[(K, V); N]>](https://doc.rust-lang.org/std/collections/hash_map/struct.HashMap.html#impl-From%3C%5B(K,+V);+N%5D%3E-for-HashMap%3CK,+V,+RandomState%, que nos permite inicializar fácilmente un mapa hash a partir de un array literal:

```rust
let page_counts = HashMap::from([
  ("Harry Potter y la piedra filosofal".to_string(), 336),
  ("Los juegos del hambre".to_string(), 374),
]);
```

HashMap también se puede crear a partir de cualquier Iterator que genere tuplas de pares clave-valor.

Mostraremos HashMap<String, i32> y evitaremos utilizar &str para que los ejemplos sean más sencillos. Por supuesto, se pueden usar las referencias en las colecciones, pero pueden dar problemas con el borrow checker.

Prueba a eliminar to_string() del ejemplo anterior para ver si aún sigue compilando. ¿Dónde crees que podríamos encontrar problemas?
Este tipo tiene varios tipos de devolución “específicos del método”, como std::collections::hash_map::Keys. Estos tipos a menudo aparecen en las
búsquedas de la documentación de Rust. Muestra a los estudiantes la documentación de este tipo y el enlace útil de vuelta al método keys.
language&>es-ES<&