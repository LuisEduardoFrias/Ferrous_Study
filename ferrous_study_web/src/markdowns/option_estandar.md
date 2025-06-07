---
key: 100
name: option_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - biblioteca estandar
 - option
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Option
Ya hemos visto algunos usos de Option<T>. Almacena un valor de tipo T o nada. Por ejemplo, String::find devuelve un Option<usize>.

```rust
fn main() {
    let name = "Löwe 老虎 Léopard Gepardi";
    let mut position: Option<usize> = name.find('é');
    println!("buscar {position:?} devuelto");
    assert_eq!(position.unwrap(), 14);
    position = name.find('Z');
    println!("buscar {position:?} devuelto");
    assert_eq!(position.expect("No se ha encontrado el carácter"), 0);
}
```

Option se usa en muchos contextos, no solo en la biblioteca estándar.
unwrap devolverá el valor en un elemento Option o un error pánico. expect funciona de forma similar, pero muestra un mensaje de error.
Puedes obtener un pánico en None, pero no puedes olvidarte “de forma accidental” de seleccionar None.
Es habitual usar unwrap/expect por todas partes, pero el código de producción suele gestionar None de una forma más adecuada.
La “optimización de nicho” significa que Option<T> a menudo tiene el mismo tamaño en memoria que T.
language&>es-ES<&