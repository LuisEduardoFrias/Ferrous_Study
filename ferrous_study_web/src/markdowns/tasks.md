---
key: 118
name: tasks
addData: 3/07/2025
updateData: null
keywords: 
 - tasks
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
#  Tasks
Rust tiene un sistema de tareas, que es una forma de hilo ligero.

Una tarea tiene un solo futuro de nivel superior que el ejecutor sondea para hacer que progrese. El futuro puede tener uno o varios futuros anidados que su método poll sondea, lo que se corresponde con una pila de llamadas. La concurrencia dentro de una tarea es posible mediante el sondeo de varios futuros secundarios , como una carrera de un temporizador y una operación de E/S.

```rust
use tokio::io::{self, AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:0").await?;
    println!("escuchando en el puerto {}", listener.local_addr()?.port());

    loop {
        let (mut socket, addr) = listener.accept().await?;

        println!("conexión de {addr:?}");

        tokio::spawn(async move {
            socket.write_all(b"¿Quién eres?\n").await.expect("error de socket");

            let mut buf = vec![0; 1024];
            let name_size = socket.read(&mut buf).await.expect("error de socket");
            let name = std::str::from_utf8(&buf[..name_size]).unwrap().trim();
            let reply = format!("¡Gracias por llamar, {name}!\n");
            socket.write_all(reply.as_bytes()).await.expect("error de socket");
        });
    }
}
```

Copia este ejemplo en el archivo src/main.rs que has preparado y ejecútalo desde ahí.

Prueba a conectarte mediante una herramienta de conexión TCP como nc o telnet.

 - Pide a los alumnos que vean cuál sería el estado del servidor de ejemplo con algunos clientes conectados. ¿Qué tareas hay? ¿Cuáles son sus futuros?
 - This is the first time we’ve seen an async block. This is similar to a closure, but does not take any arguments. Its return value is a Future, similar to an async fn.
 - Refactoriza el bloque asíncrono en una función y mejora la gestión de errores con ?.


language&>es-ES<&