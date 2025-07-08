---
key: 108
name: mutex
addData: 3/07/2025
updateData: null
keywords: 
 - mutex
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Mutex
Mutex<T> ensures mutual exclusion and allows mutable access to T behind a read-only interface (another form of interior mutability):

```rust
use std::sync::Mutex;

fn main() {
    let v = Mutex::new(vec![10, 20, 30]);
    println!("v: {:?}", v.lock().unwrap());

    {
        let mut guard = v.lock().unwrap();
        guard.push(40);
    }

    println!("v: {:?}", v.lock().unwrap());
}
```

Fíjate en cómo tenemos una implementación general de impl<T: Send> Sync for Mutex<T>.

 - Mutex in Rust looks like a collection with just one element — the protected data.
   - No es posible olvidarse de adquirir la exclusión mutua antes de acceder a los datos protegidos.
 - Puedes obtener un &mut T de Mutex<T> mediante el bloqueo. El MutexGuard asegura que &mut T no dure más tiempo que el bloqueo que se ha aplicado.
 - Mutex<T> implementa tanto Send como Sync únicamente si T implementa Send.
 - A read-write lock counterpart: RwLock.
 - Why does lock() return a Result?
   - Si el hilo que contiene Mutex entra en pánico, Mutex se “envenena” para indicar que los datos que protegía pueden estar en un estado incoherente. Llamar a lock() en una exclusión mutua envenenada da el error PoisonError. Puedes llamar a into_inner() en el error para recuperar los datos de todos modos.
language&>es-ES<&