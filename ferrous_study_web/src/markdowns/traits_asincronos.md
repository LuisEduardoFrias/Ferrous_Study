---
key: 124
name: traits_asincronos
addData: 3/07/2025
updateData: null
keywords: 
 - traits asincronos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Traits asíncronos
Async methods in traits are were stabilized only recently, in the 1.75 release. This required support for using return-position impl Trait (RPIT) in traits, as the desugaring for async fn includes -> impl Future<Output = ...>.

However, even with the native support today there are some pitfalls around async fn and RPIT in traits:

 - Return-position impl Trait captures all in-scope lifetimes (so some patterns of borrowing cannot be expressed)
 - Traits whose methods use return-position impl trait or async are not dyn compatible.

If we do need dyn support, the crate async_trait provides a workaround through a macro, with some caveats:

```rust
use async_trait::async_trait;
use std::time::Instant;
use tokio::time::{sleep, Duration};

#[async_trait]
trait Sleeper {
    async fn sleep(&self);
}

struct FixedSleeper {
    sleep_ms: u64,
}

#[async_trait]
impl Sleeper for FixedSleeper {
    async fn sleep(&self) {
        sleep(Duration::from_millis(self.sleep_ms)).await;
    }
}

async fn run_all_sleepers_multiple_times(
    sleepers: Vec<Box<dyn Sleeper>>,
    n_times: usize,
) {
    for _ in 0..n_times {
        println!("ejecutando todos los sleepers…".);
        for sleeper in &sleepers {
            let start = Instant::now();
            sleeper.sleep().await;
            println!("ha dormido {} ms", start.elapsed().as_millis());
        }
    }
}

#[tokio::main]
async fn main() {
    let sleepers: Vec<Box<dyn Sleeper>> = vec![
        Box::new(FixedSleeper { sleep_ms: 50 }),
        Box::new(FixedSleeper { sleep_ms: 100 }),
    ];
    run_all_sleepers_multiple_times(sleepers, 5).await;
}
```

 - async_trait es fácil de usar, pero ten en cuenta que utiliza asignaciones de montículos para conseguirlo. Esta asignación de montículo tiene una sobrecarga de rendimiento.
 - Los problemas de compatibilidad del lenguaje con async trait son muy complejos y no vale la pena describirlos en profundidad. Niko Matsakis lo explica muy bien en esta publicación, por si te interesa investigar más a fondo.
 - Prueba a crear una estructura que entre en suspensión durante un periodo aleatorio y añádela a Vec.

language&>es-ES<&