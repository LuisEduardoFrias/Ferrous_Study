---
key: 114
name: async_await
addData: 3/07/2025
updateData: null
keywords: 
 - async
 - await
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Async / await

“Async” es un modelo de concurrencia en el que se ejecutan varias tareas al mismo tiempo. Se ejecuta cada una de ellas hasta que se bloquea y, a continuación, se cambia a otra tarea que está lista para progresar. El modelo permite ejecutar un mayor número de tareas en un número limitado de hilos. Esto se debe a que la sobrecarga por tarea suele ser muy baja y los sistemas operativos proporcionan primitivos para identificar de forma eficiente las E/S que pueden continuar.

La operación asíncrona de Rust se basa en “valores futuros”, que representan el trabajo que puede completarse más adelante. Los futuros se “sondean” hasta que indican que se han completado.

Los futuros se sondean mediante un tiempo de ejecución asíncrono y hay disponibles varios tiempos de ejecución diferentes.

Comparaciones
 - Python tiene un modelo similar en su asyncio. Sin embargo, su tipo Future está basado en retrollamadas y no se sondea. Los programas asíncronos de Python requieren un “bucle”, similar a un tiempo de ejecución en Rust.

 - Promise de JavaScript es parecido, pero también se basa en retrollamadas. El tiempo de ejecución del lenguaje implementa el bucle de eventos, por lo que muchos de los detalles de la resolución de Promise están ocultos.

En general, el código asíncrono de Rust se parece mucho al código secuencial “normal”:

```rust
use futures::executor::block_on;

async fn count_to(count: i32) {
    for i in 1..=count {
        println!("El recuento es: ¡{i}!");
    }
}

async fn async_main(count: i32) {
    count_to(count).await;
}

fn main() {
    block_on(async_main(10));
}
```

Puntos clave:
 - Ten en cuenta que este es un ejemplo simplificado para mostrar la sintaxis. No hay ninguna operación de larga duración ni concurrencia real.
 - ¿Cuál es el tipo de resultado devuelto de una llamada asíncrona?
   - Consulta el tipo con let future: () = async_main(10); en main .
 - The “async” keyword is syntactic sugar. The compiler replaces the return type with a future.
 - No se puede hacer que main sea asíncrono sin dar instrucciones adicionales al compilador sobre cómo usar el futuro devuelto.
 - You need an executor to run async code. block_on blocks the current thread until the provided future has run to completion.
 - .await espera de forma asíncrona la finalización de otra operación. A diferencia de block_on, .await no bloquea el hilo.
 - .await can only be used inside an async function (or block; these are introduced later).
language&>es-ES<&