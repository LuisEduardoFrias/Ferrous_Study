---
key: 128
name: solucion_cena_filosofos_async
addData: 3/07/2025
updateData: null
keywords: 
 - solución
 - cena de los filósofos async
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solucion, la cana de los filósofos - async

```rust
use std::sync::Arc;
use tokio::sync::mpsc::{self, Sender};
use tokio::sync::Mutex;
use tokio::time;

struct Fork;

struct Philosopher {
    name: String,
    left_fork: Arc<Mutex<Fork>>,
    right_fork: Arc<Mutex<Fork>>,
    thoughts: Sender<String>,
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
        let (_left_fork, _right_fork) = loop {
            // Recoge los tenedores...
            let left_fork = self.left_fork.try_lock();
            let right_fork = self.right_fork.try_lock();
            let Ok(left_fork) = left_fork else {
                // If we didn't get the left fork, drop the right fork if we
                // have it and let other tasks make progress.
                drop(right_fork);
                time::sleep(time::Duration::from_millis(1)).await;
                continue;
            };
            let Ok(right_fork) = right_fork else {
                // If we didn't get the right fork, drop the left fork and let
                // other tasks make progress.
                drop(left_fork);
                time::sleep(time::Duration::from_millis(1)).await;
                continue;
            };
            break (left_fork, right_fork);
        };

        println!("{} está comiendo...", &self.name);
        time::sleep(time::Duration::from_millis(5)).await;

        // Los bloqueos se eliminan aquí
    }
}

static PHILOSOPHERS: &[&str] =
    &["Socrates", "Hipatia", "Platón", "Aristóteles", "Pitágoras"];

#[tokio::main]
async fn main() {
    // Crea tenedores
    let mut forks = vec![];
    (0..PHILOSOPHERS.len()).for_each(|_| forks.push(Arc::new(Mutex::new(Fork))));

    // Crea filósofos
    let (philosophers, mut rx) = {
        let mut philosophers = vec![];
        let (tx, rx) = mpsc::channel(10);
        for (i, name) in PHILOSOPHERS.iter().enumerate() {
            let left_fork = Arc::clone(&forks[i]);
            let right_fork = Arc::clone(&forks[(i + 1) % PHILOSOPHERS.len()]);
            philosophers.push(Philosopher {
                name: name.to_string(),
                left_fork,
                right_fork,
                thoughts: tx.clone(),
            });
        }
        (philosophers, rx)
        // tx se elimina aquí, por lo que no tenemos que eliminarlo explícitamente más tarde.
    };

    // Hazles pensar y comer
    for phil in philosophers {
        tokio::spawn(async move {
            for _ in 0..100 {
                phil.think().await;
                phil.eat().await;
            }
        });
    }

    // Expresa sus reflexiones
    while let Some(thought) = rx.recv().await {
        println!("Aquí tienes una reflexión: {thought}");
    }
}
```

language&>es-ES<&