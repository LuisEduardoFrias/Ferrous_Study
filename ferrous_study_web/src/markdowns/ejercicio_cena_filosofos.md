---
key: 110
name: ejercicio_cena_filosofos
addData: 3/07/2025
updateData: null
keywords: 
 - ejercicio
 - cena de los filosofos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# La cena de los filósofos
El problema de la cena de los filósofos es un problema clásico de concurrencia:

Cinco filósofos cenan juntos en la misma mesa. Cada filósofo tiene su propio sitio en ella. Hay un tenedor entre cada plato. El plato que van a degustar es una especie de espaguetis que hay que comer con dos tenedores. Los filósofos solo pueden pensar y comer alternativamente. Además, solo pueden comer sus espaguetis cuando disponen de un tenedor a la izquierda y otro a la derecha. Por tanto, los dos tenedores solo estarán disponibles cuando su dos vecinos más cercanos estén pensando y no comiendo. Cuando un filósofo termina de comer, deja los dos tenedores en la mesa.

Para realizar este ejercicio necesitarás una [instalación local de Cargo] (../../cargo/running-locally.md). Copia el fragmento de código que aparece más abajo en un archivo denominado src/main.rs, rellena los espacios en blanco y comprueba que cargo run no presenta interbloqueos:

```rust
use std::sync::{mpsc, Arc, Mutex};
use std::thread;
use std::time::Duration;

struct Fork;

struct Philosopher {
    name: String,
    // left_fork: ...
    // right_fork: ...
    // thoughts: ...
}

impl Philosopher {
    fn think(&self) {
        self.thoughts
            .send(format!("¡Eureka! ¡{} tiene una nueva idea!", &self.name))
            .unwrap();
    }

    fn eat(&self) {
        // Recoge los tenedores...
        println!("{} está comiendo...", &self.name);
        thread::sleep(Duration::from_millis(10));
    }
}

static PHILOSOPHERS: &[&str] =
    &["Socrates", "Hipatia", "Platón", "Aristóteles", "Pitágoras"];

fn main() {
    // Crea tenedores

    // Crea filósofos

    // Haz que cada uno de ellos piense y coma 100 veces

    // Expresa sus reflexiones
}
```

Puedes usar el siguiente archivo Cargo.toml:

```rust
[package]
name = "dining-philosophers"
version = "0.1.0"
edition = "2021"
```

language&>es-ES<&