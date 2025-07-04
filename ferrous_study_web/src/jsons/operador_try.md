---
key: 84
name: operador_try
addData: 3/07/2025
updateData: null
keywords: 
 - operador try
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Operador Try (Intentar)
Los errores de tiempo de ejecución, como los de fallo en la conexión o de archivo no encontrado, se gestionan con el tipo Result, pero hacer coincidir este tipo en todas las llamadas puede ser complicado. El operador try ? se utiliza para devolver errores al llamador. Te permite convertir lo habitual

```rust
match some_expression {
    Ok(value) => value,
    Err(err) => return Err(err),
}
```

en algo mucho más sencillo:

```bash
some_expression?
```

Podemos utilizarlo para simplificar el código de gestión de errores:

```rust
use std::io::Read;
use std::{fs, io};

fn read_username(path: &str) -> Result<String, io::Error> {
    let username_file_result = fs::File::open(path);
    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(err) => return Err(err),
    };

    let mut username = String::new();
    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(err) => Err(err),
    }
}

fn main() {
    //fs::write("config.dat", "alice").unwrap();
    let username = read_username("config.dat");
    println!("nombre de usuario o error: {username:?}");
}
```

Simplifica la función read_username para usar ?.

Puntos clave:

La variable username puede ser Ok(string) o Err(error).
Utiliza la llamada a fs::write para probar las distintas situaciones: sin archivo, archivo vacío o archivo con nombre de usuario.
Note that main can return a Result<(), E> as long as it implements std::process::Termination. In practice, this means that E implements Debug. The executable will print the Err variant and return a nonzero exit status on error.
language&>es-ES<&