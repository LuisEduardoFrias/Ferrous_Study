---
key: 101
name: canales_sin_limites
addData: 3/07/2025
updateData: null
keywords: 
 - canales sin limites
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Canales sin límites
Se obtiene un canal asíncrono y sin límites con mpsc::channel():

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

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

language&>es-ES<&