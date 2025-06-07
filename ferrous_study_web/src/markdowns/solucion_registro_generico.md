---
key: 89
name: solucion_registro_generico
addData: 06/06/2025
updateData: null
keywords: 
 - solución
 - registro genérico
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución

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

/// Registra solo los mensajes que cumplan el nivel de verbosidad determinado.
struct VerbosityFilter {
    max_verbosity: u8,
    inner: StderrLogger,
}

impl Logger for VerbosityFilter {
    fn log(&self, verbosity: u8, message: impl Display) {
        if verbosity <= self.max_verbosity {
            self.inner.log(verbosity, message);
        }
    }
}

fn main() {
    let l = VerbosityFilter { max_verbosity: 3, inner: StderrLogger };
    do_things(&l);
}
```

language&>es-ES<&