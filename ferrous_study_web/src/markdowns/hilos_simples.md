---
key: 98
name: hilos_simples
addData: 3/07/2025
updateData: null
keywords: 
 - hilos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Hilos Simples
Los hilos de Rust funcionan de forma similar a los de otros lenguajes:

```rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("Recuento en el hilo: {i}!");
            thread::sleep(Duration::from_millis(5));
        }
    });

    for i in 1..5 {
        println!("Hilo principal: {i}");
        thread::sleep(Duration::from_millis(5));
    }
}
```

Los hilos son todos hilos daemon, y el hilo principal no espera por ellos.
Los pánicos de los hilos son independientes entre sí.
Los pánicos pueden transportar una carga útil, que se puede desempaquetar con downcast_ref.

Rust thread APIs look not too different from e.g. C++ ones.

Run the example.
 - 5ms timing is loose enough that main and spawned threads stay mostly in lockstep.
 - Notice that the program ends before the spawned thread reaches 10!
 - This is because main ends the program and spawned threads do not make it persist.
   - Compare to pthreads/C++ std::thread/boost::thread if desired.

How do we wait around for the spawned thread to complete?

thread::spawn returns a JoinHandle. Look at the docs.
 - JoinHandle has a .join() method that blocks.
 
Use let handle = thread::spawn(...) and later handle.join() to wait for the thread to finish and have the program count all the way to 10.

Now what if we want to return a value?

Look at docs again:
 - thread::spawn’s closure returns T
 - JoinHandle .join() returns thread::Result<T>
 
Use the Result return value from handle.join() to get access to the returned value.

Ok, what about the other case?
 - Trigger a panic in the thread. Note that this doesn’t panic main.
 - Access the panic payload. This is a good time to talk about Any.

Now we can return values from threads! What about taking inputs?
 - Capture something by reference in the thread closure.
 - An error message indicates we must move it.
 - Move it in, see we can compute and then return a derived value.

If we want to borrow?
 - Main kills child threads when it returns, but another function would just return and leave them running.
 - That would be stack use-after-return, which violates memory safety!
 - How do we avoid this? see next slide.
language&>es-ES<&