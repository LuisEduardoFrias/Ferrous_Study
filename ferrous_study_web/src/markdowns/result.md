---
key: 83
name: result
addData: 3/07/2025
updateData: null
keywords: 
 - result
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Result
El mecanismo primario para el manejo de errores en Rust es el enum Result, que vimos brevemente al discutir los tipos de la biblioteca estándar.

```rust
use std::fs::File;
use std::io::Read;

fn main() {
    let file: Result<File, std::io::Error> = File::open("diary.txt");
    match file {
        Ok(mut file) => {
            let mut contents = String::new();
            if let Ok(bytes) = file.read_to_string(&mut contents) {
                println!("Querido diario: {contents} ({bytes} bytes)");
            } else {
                println!("No se ha podido leer el contenido del archivo");
            }
        }
        Err(err) => {
            println!("No se ha podido abrir el diario: {err}");
        }
    }
}
```

Result tiene dos variantes: Ok, que contiene el valor de éxito; y Err, que contiene un valor de error de algún tipo.

La signatura de tipo de una función indica si puede producir un error, en este caso devolverá un valor Result.

Como con Option, no hay manera de olvidarse de manejar un error: no puedes acceder el valor de éxito o el valor de error sin hacer coincidencia de patrones sobre el Result para ver que variante tienes. Métodos como unwrap hacen que sea mas fácil escribir código rápido-y-sucio que no maneja errores de una forma robusta, pero esto significa que siempre puedes ver en tu código donde no estas manejando errores de la manera propia.

Más información
Podria ayudar comparar el manejo de errores en Rust con las convenciones de manejo de errores de otros lenguajes que conocen los estudiantes.

Excepciones
Muchos lenguajes usan excepciones, e.g. C++, Java, Python.

En la mayoria

Exceptions generally unwind the call stack, propagating upward until a try block is reached. An error originating deep in the call stack may impact an unrelated function further up.

Error Numbers
Some languages have functions return an error number (or some other error value) separately from the successful return value of the function. Examples include C and Go.

Depending on the language it may be possible to forget to check the error value, in which case you may be accessing an uninitialized or otherwise invalid success value.


language&>es-ES<&