---
key: 102
name: canales_delimitados
addData: 3/07/2025
updateData: null
keywords: 
 - canales delimitados
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Canales delimitados
Con canales limitados (síncronos), send puede bloquear el hilo:

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::sync_channel(3);

    thread::spawn(move || {
        let thread_id = thread::current().id();
        for i in 1..10 {
            tx.send(format!("Mensaje {i}")).unwrap();
            println!("{thread_id:?}: mensaje enviado {i}");
        }
        println!("{thread_id:?}: completado");
    });
    thread::sleep(Duration::from_millis(100));

    for msg in rx.iter() {
        println!("Principal: ha recibido {msg}");
    }
}
```

Al llamar a send, se bloqueará el hilo hasta que haya espacio suficiente en el canal para el mensaje nuevo. El hilo se puede bloquear de forma indefinida si no hay nadie que lea el canal.
Si se cierra el canal, se anulará la llamada a send y se producirá un error (por eso devuelve Result). Un canal se cierra cuando se elimina el receptor.
A bounded channel with a size of zero is called a “rendezvous channel”. Every send will block the current thread until another thread calls recv.

language&>es-ES<&