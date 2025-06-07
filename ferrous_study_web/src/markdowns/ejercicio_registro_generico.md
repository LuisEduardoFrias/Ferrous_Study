---
key: 88
name: ejercicio_registro_generico
addData: 06/06/2025
updateData: null
keywords: 
 - ejercicio
 - registro genérico
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Ejercicio: trait de registro
Vamos a diseñar una sencilla utilidad de registro mediante un trait Logger con un método log. El código que podría registrar su progreso puede usar &impl Logger. En las pruebas, esta acción colocaría mensajes en el archivo de registro de la prueba, mientras que en una compilación de producción enviaría los mensajes a un servidor de registro.

Sin embargo, el elemento StderrLogger que aparece a continuación registra todos los mensajes, independientemente de su verbosidad. Tu tarea es escribir un tipo VerbosityFilter que ignore los mensajes que superen el máximo de verbosidad.

Este es un patrón común: una struct que envuelve una implementación de traits e implementa ese mismo trait, añadiendo comportamiento en el proceso. ¿Qué otros tipos de envoltorios pueden ser útiles en una utilidad de registro?

```rust
use std::fmt::Display;

pub trait Logger {
    /// Registra un mensaje con el nivel de verbosidad determinado.
    fn log(&self, verbosity: u8, message: impl Display);
}

struct StderrLogger;

impl Logger for StderrLogger {
    fn log(&self, verbosity: u8, message: impl Display) {
        eprintln!("verbosidad={verbosity}: {message}");
    }
}

fn do_things(logger: &impl Logger) {
    logger.log(5, "Para tu información");
    logger.log(2, "Oh, oh");
}

// TAREA: Define e implementa `VerbosityFilter`.

fn main() {
    let l = VerbosityFilter { max_verbosity: 3, inner: StderrLogger };
    do_things(&l);
}
```

language&>es-ES<&