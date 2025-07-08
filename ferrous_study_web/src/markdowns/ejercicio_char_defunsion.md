---
key: 127
name: ejercicio_char_defunsion
addData: 3/07/2025
updateData: null
keywords: 
 - ekercicio
 - char de defunsión
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Aplicación de chat de difusión
En este ejercicio, queremos usar nuestros nuevos conocimientos para implementar una aplicación de chat de difusión. Disponemos de un servidor de chat al que los clientes se conectan y publican sus mensajes. El cliente lee los mensajes de usuario de la entrada estándar y los envía al servidor. El servidor del chat transmite cada mensaje que recibe a todos los clientes.

Para ello, usaremos [un canal en abierto](https://docs.rs/tokio/latest/tokio/sync/broadcast/fn.channel.html) en el servidor y tokio_websockets para la comunicación entre el cliente y el servidor.

Crea un proyecto de Cargo y añade las siguientes dependencias:

Cargo.toml:
```rust
[package]
name = "chat-async"
version = "0.1.0"
edition = "2021"

[dependencies]
futures-util = { version = "0.3.30", features = ["sink"] }
http = "1.1.0"
tokio = { version = "1.38.0", features = ["full"] }
tokio-websockets = { version = "0.8.3", features = ["client", "fastrand", "server", "sha1_smol"] }
```

## Las APIs necesarias
Necesitarás las siguientes funciones de tokio y tokio_websockets. Dedica unos minutos a familiarizarte con la API.
 - StreamExt::next() implementado por WebSocketStream: permite enviar mensajes de forma asíncrona a través de un flujo Websocket.
 - SinkExt::send() implementado por WebsocketStream: permite enviar mensajes de forma asíncrona a través de un flujo Websocket.
 - Lines::next_line(): para la lectura asíncrona de mensajes de usuario de la entrada estándar.
 - Sender::subscribe(): para suscribirse a un canal en abierto.

## Dos binarios
Normalmente, en un proyecto de Cargo, solo puedes tener un archivo binario y un archivo src/main.rs. En este proyecto, se necesitan dos binarios, uno para el cliente y otro para el servidor. Puedes convertirlos en dos proyectos de Cargo independientes, pero los incluiremos en un solo proyecto de Cargo con dos binarios. Para que funcione, el código del cliente y del servidor deben aparecer en src/bin (consulta la documentación).

Copia el fragmento de código del servidor y del cliente que aparecen más abajo en src/bin/server.rs y src/bin/client.rs, respectivamente. Tu tarea es completar estos archivos como se describe a continuación.

src/bin/server.rs:

```rust
use futures_util::sink::SinkExt;
use futures_util::stream::StreamExt;
use std::error::Error;
use std::net::SocketAddr;
use tokio::net::{TcpListener, TcpStream};
use tokio::sync::broadcast::{channel, Sender};
use tokio_websockets::{Message, ServerBuilder, WebSocketStream};

async fn handle_connection(
    addr: SocketAddr,
    mut ws_stream: WebSocketStream<TcpStream>,
    bcast_tx: Sender<String>,
) -> Result<(), Box<dyn Error + Send + Sync>> {

    // TODO: Para obtener una pista, consulta la descripción de la tarea a continuación.

}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error + Send + Sync>> {
    let (bcast_tx, _) = channel(16);

    let listener = TcpListener::bind("127.0.0.1:2000").await?;
    println!("escuchando en el puerto 2000");

    loop {
        let (socket, addr) = listener.accept().await?;
        println!("Nueva conexión de {addr:?}");
        let bcast_tx = bcast_tx.clone();
        tokio::spawn(async move {
            // Envuelve el flujo TCP sin procesar en un websocket.
            let ws_stream = ServerBuilder::new().accept(socket).await?;

            handle_connection(addr, ws_stream, bcast_tx).await
        });
    }
}
```

src/bin/client.rs:

```rust
use futures_util::stream::StreamExt;
use futures_util::SinkExt;
use http::Uri;
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio_websockets::{ClientBuilder, Message};

#[tokio::main]
async fn main() -> Result<(), tokio_websockets::Error> {
    let (mut ws_stream, _) =
        ClientBuilder::from_uri(Uri::from_static("ws://127.0.0.1:2000"))
            .connect()
            .await?;

    let stdin = tokio::io::stdin();
    let mut stdin = BufReader::new(stdin).lines();


    // TODO: Para obtener una pista, consulta la descripción de la tarea a continuación.

}
```

## Ejecutar los binarios
Ejecuta el servidor con:

```rust
cargo run --bin server
```

y el cliente con:

```rust
cargo run --bin client
```

## Tasks
 - Implementa la función handle_connection en src/bin/server.rs.
   - Sugerencia: usa tokio::select! para realizar dos tareas simultáneamente en un bucle continuo. Una tarea recibe mensajes del cliente y los transmite. La otra envía los mensajes que recibe el servidor al cliente.
 - Completa la función principal en src/bin/client.rs.
   - Sugerencia: al igual que antes, usa tokio::select! en un bucle continuo para realizar dos tareas simultáneamente: (1) leer los mensajes del usuario desde la entrada estándar y enviarlos al servidor, y (2) recibir mensajes del servidor y mostrárselos al usuario.
 - Opcional: cuando termines, cambia el código para difundir mensajes a todos los clientes, excepto al remitente.
language&>es-ES<&