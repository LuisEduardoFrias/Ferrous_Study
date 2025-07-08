---
key: 126
name: ejercicio_cena_filosofos_async
addData: 3/07/2025
updateData: null
keywords: 
 - ejercicio
 - cena de los filósofos async
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# La Cena de Filósofos — Async
See dining philosophers for a description of the problem.

Como antes, necesitarás una instalación local de Cargo para realizar el ejercicio. Copia el fragmento de código que aparece más abajo en un archivo denominado src/main.rs, rellena los espacios en blanco y comprueba que cargo run no presenta interbloqueos:

```rust
use std::sync::Arc;
use tokio::sync::mpsc::{self, Sender};
use tokio::sync::Mutex;
use tokio::time;

struct Fork;

struct Philosopher {
    name: String,
    // left_fork: ...
    // right_fork: ...
    // thoughts: ...
}

impl Philosopher {
    async fn think(&self) {
        self.thoughts
            .send(format!("¡Eureka! ¡{} tiene una nueva idea!", &self.name))
            .await
            .unwrap();
    }

    async fn eat(&self) {
        // Keep trying until we have both forks
        println!("{} está comiendo...", &self.name);
        time::sleep(time::Duration::from_millis(5)).await;
    }
}

static PHILOSOPHERS: &[&str] =
    &["Socrates", "Hipatia", "Platón", "Aristóteles", "Pitágoras"];

#[tokio::main]
async fn main() {
    // Crea tenedores

    // Crea filósofos

    // Hazles pensar y comer

    // Expresa sus reflexiones
}
```

Dado que esta vez usas async, necesitarás una dependencia tokio. Puedes usar el siguiente Cargo.toml:

```rust
[package]
name = "dining-philosophers-async-dine"
version = "0.1.0"
edition = "2021"

[dependencies]
tokio = { version = "1.26.0", features = ["sync", "time", "macros", "rt-multi-thread"] }
```

Además, ten en cuenta que esta vez tienes que utilizar Mutex y el módulo mpsc del crate tokio.

¿Puedes conseguir que tu implementación tenga un solo hilo?

language&>es-ES<&