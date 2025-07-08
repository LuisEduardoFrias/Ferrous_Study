---
key: 100
name: transmisores_receptores
addData: 3/07/2025
updateData: null
keywords: 
 - transmisores
 - receptores
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Transmisores y Receptores
Los canales de Rust tienen dos partes: Sender<T> y Receiver<T>. Las dos partes están conectadas a través del canal, pero solo se ven los puntos finales.

```rust
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    tx.send(10).unwrap();
    tx.send(20).unwrap();

    println!("Recibido: {:?}", rx.recv());
    println!("Recibido: {:?}", rx.recv());

    let tx2 = tx.clone();
    tx2.send(30).unwrap();
    println!("Recibido: {:?}", rx.recv());
}
```

mpsc son las siglas de Multi-Producer, Single-Consumer (multiproductor, consumidor único.) Sender y SyncSender implementan Clone (es decir, puedes crear varios productores), pero Receiver no.
send() y recv() devuelven Result. Si devuelven Err, significa que el homólogo Sender o Receiver se ha eliminado y el canal se ha cerrado.
language&>es-ES<&