---
key: 122
name: bloqueo_ejecutor
addData: 3/07/2025
updateData: null
keywords: 
 - bloqueo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Bloqueo del ejecutor

Async/await proporciona una abstracción práctica y eficiente para la programación asíncrona concurrente. Sin embargo, el modelo async/await en Rust
también presenta sus inconvenientes y dificultades. Ilustramos algunos de ellos en este capítulo.

La mayoría de los tiempos de ejecución asíncronos solo permiten que las tareas de E/S se ejecuten de forma simultánea. Esto significa que las tareas que bloquean la CPU bloquearán el ejecutor e impedirán que se ejecuten otras tareas. Una solución alternativa y sencilla es utilizar métodos asíncronos equivalentes siempre que sea posible.

```rust
use futures::future::join_all;
use std::time::Instant;

async fn sleep_ms(start: &Instant, id: u64, duration_ms: u64) {
    std::thread::sleep(std::time::Duration::from_millis(duration_ms));
    println!(
        "future {id} ha dormido {duration_ms} min, terminó después de {} ms",
        start.elapsed().as_millis()
    );
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let start = Instant::now();
    let sleep_futures = (1..=10).map(|t| sleep_ms(&start, t, t * 10));
    join_all(sleep_futures).await;
}
```

 - Ejecuta el código y comprueba que las suspensiones se producen de forma consecutiva y no simultánea.
 - La versión "current_thread" reúne todas las tareas en un solo hilo. Esto consigue que el efecto sea más obvio, pero el error sigue estando presente en la versión multihilo.
 - Cambia std::thread::sleep a tokio::time::sleep. y espera su resultado.
 - Otra solución sería tokio::task::spawn_blocking, que genera un hilo real y transforma su controlador en un futuro sin bloquear el ejecutor.
 - No debes pensar en las tareas como hilos del sistema operativo. No se asignan 1 a 1 y la mayoría de los ejecutores permitirán que se ejecuten muchas tareas en un solo hilo del sistema operativo. Esta situación es especialmente problemática cuando se interactúa con otras bibliotecas a través de FFI, donde dicha biblioteca puede depender del almacenamiento local de hilos o puede asignarse a hilos específicos del sistema operativo (por ejemplo, CUDA). En estos casos es preferible usar tokio::task::spawn_blocking.
 - Utiliza las exclusión mutuas de sincronización con cuidado. Si mantienes una exclusión mutua sobre un .await, puede que se bloquee otra tarea y que esta se esté ejecutando en el mismo hilo.

language&>es-ES<&