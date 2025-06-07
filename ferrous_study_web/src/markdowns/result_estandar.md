---
key: 101
name: result_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - biblioteca estandar
 - result
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Result
Result es parecido a Option, pero indica si una operación se ha completado de forma correcta o ha fallado, cada una con un tipo diferente. Es genérico: Result<T, E> donde T es usado en el variante Ok y E en el variante Err.

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

Al igual que con Option, el valor correcto se encuentra dentro de Result, lo que obliga al desarrollador a extraerlo de forma explícita. Esto fomenta la comprobación de errores. En el caso de que nunca se produzca un error, se puede llamar a unwrap() o a expect(), y esto también es una señal de la intención del desarrollador.
La documentación sobre Result es una lectura recomendada. Aunque no se vea durante este curso, merece la pena mencionarlo. Contiene muchos métodos y funciones prácticos que ayudan a seguir un estilo de programación funcional.
Result es el tipo estándar para implementar la gestión de errores, tal y como veremos el día 4.
language&>es-ES<&