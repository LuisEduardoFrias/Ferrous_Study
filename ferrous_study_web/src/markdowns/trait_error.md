---
key: 86
name: trait_error
addData: 3/07/2025
updateData: null
keywords: 
 - trait error
 - Tipos de Errores Dinámicos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Tipos de Errores Dinámicos
A veces queremos permitir que se devuelva cualquier tipo de error sin tener que escribir nuestro propio enum que cubra todas las diferentes posibilidades. El trait std::error::Error facilita la creación de un objeto de trait que puede contener cualquier error.

```rust
use std::error::Error;
use std::fs;
use std::io::Read;

fn read_count(path: &str) -> Result<i32, Box<dyn Error>> {
    let mut count_str = String::new();
    fs::File::open(path)?.read_to_string(&mut count_str)?;
    let count: i32 = count_str.parse()?;
    Ok(count)
}

fn main() {
    fs::write("count.dat", "1i3").unwrap();
    match read_count("count.dat") {
        Ok(count) => println!("Recuento: {count}"),
        Err(err) => println!("Error: {err}"),
    }
}
```

La función read_count puede devolver std::io::Error (de las operaciones de archivos) o std::num::ParseIntError (de String::parse).

Boxing errors saves on code, but gives up the ability to cleanly handle different error cases differently in the program. As such it’s generally not a good idea to use Box<dyn Error> in the public API of a library, but it can be a good option in a program where you just want to display the error message somewhere.

Asegúrate de implementar el trait std::error::Error al definir un tipo de error personalizado para que pueda tener una estructura box. Sin embargo, si necesitas el atributo no_std, ten en cuenta que el trait std::error::Error de momento solo es compatible con no_std en nightly.


language&>es-ES<&