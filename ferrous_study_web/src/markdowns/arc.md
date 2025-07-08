---
key: 107
name: arc
addData: 3/07/2025
updateData: null
keywords: 
 - arc
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Arc
Arc<T> permite el acceso compartido de solo lectura a través de Arc::clone:

```rust
use std::sync::Arc;
use std::thread;

fn main() {
    let v = Arc::new(vec![10, 20, 30]);
    let mut handles = Vec::new();
    for _ in 1..5 {
        let v = Arc::clone(&v);
        handles.push(thread::spawn(move || {
            let thread_id = thread::current().id();
            println!("{thread_id:?}: {v:?}");
        }));
    }

    handles.into_iter().for_each(|h| h.join().unwrap());
    println!("v: {v:?}");
}
```

 - Arc son las siglas de “Atomic Reference Counted” (recuento atómico de referencias), una versión de Rc segura para los hilos que utiliza operaciones atómicas.
 - Arc<T> implementa Clone, independientemente de si T lo hace o no. Implementa Send y Sync si T implementa ambos.
 - Arc::clone() tiene el coste de las operaciones atómicas que se ejecutan; después el uso de T es libre.
 - Hay que prestar atención a los ciclos de referencia, ya que Arc no usa un recolector de memoria residual para detectarlos.
 - std::sync::Weak puede resultar útil.
language&>es-ES<&