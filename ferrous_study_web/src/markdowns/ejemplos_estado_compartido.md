---
key: 109
name: ejemplos_estado_compartido
addData: 3/07/2025
updateData: null
keywords: 
 - ejemplo
 - estado compartido
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejemplo
Veamos cómo funcionan Arc y Mutex:

```rust
use std::thread;
// usar std::sync::{Arc, Mutex};

fn main() {
    let v = vec![10, 20, 30];
    let handle = thread::spawn(|| {
        v.push(10);
    });
    v.push(1000);

    handle.join().unwrap();
    println!("v: {v:?}");
}
```

Solución posible:

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let v = Arc::new(Mutex::new(vec![10, 20, 30]));

    let v2 = Arc::clone(&v);
    let handle = thread::spawn(move || {
        let mut v2 = v2.lock().unwrap();
        v2.push(10);
    });

    {
        let mut v = v.lock().unwrap();
        v.push(1000);
    }

    handle.join().unwrap();

    println!("v: {v:?}");
}
```

Puntos a destacar:
 - v se envuelve tanto en Arc como en Mutex, porque sus preocupaciones son ortogonales.
   - Envolver un Mutex en un Arc es un patrón habitual para compartir el estado mutable entre hilos.
 - v: Arc<_> se debe clonar como v2 antes de poder moverlo a otro hilo. Ten en cuenta que move se ha añadido a la firma lambda.
 - Se introducen bloqueos para limitar al máximo el ámbito de LockGuard.
language&>es-ES<&