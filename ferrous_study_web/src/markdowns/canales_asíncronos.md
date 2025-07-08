---
key: 119
name: canales_asíncronos
addData: 3/07/2025
updateData: null
keywords: 
 - canales asincronos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Canales asíncronos
Varios crates admiten canales asíncronos. Por ejemplo, tokio:

```rust
use tokio::sync::mpsc::{self, Receiver};

async fn ping_handler(mut input: Receiver<()>) {
    let mut count: usize = 0;

    while let Some(_) = input.recv().await {
        count += 1;
        println!("Se han recibido {count} pings hasta el momento.");
    }

    println!("ping_handler completo");
}

#[tokio::main]
async fn main() {
    let (sender, receiver) = mpsc::channel(32);
    let ping_handler_task = tokio::spawn(ping_handler(receiver));
    for i in 0..10 {
        sender.send(()).await.expect("No se ha podido enviar el ping.");
        println!("Se han enviado {} pings hasta ahora.", i + 1);
    }

    drop(sender);
    ping_handler_task.await.expect("Se ha producido un error en la tarea del controlador de ping.");
}
```

 - Cambia el tamaño del canal a 3 y comprueba cómo afecta a la ejecución.
 - Overall, the interface is similar to the sync channels as seen in the morning class.
 - Prueba a quitar la llamada a std::mem::drop. ¿Qué sucede? ¿Por qué?
 - El crate Flume tiene canales que implementan sync y async,send y recv. Esto puede resultar práctico para aplicaciones complejas con tareas de E/S y tareas pesadas de procesamiento de CPU.
 - Es preferible trabajar con canales async por la capacidad de combinarlos con otros future para poder crear un flujo de control complejo.

language&>es-ES<&