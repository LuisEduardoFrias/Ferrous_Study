---
key: 106
name: ejemplos_send_sync
addData: 3/07/2025
updateData: null
keywords: 
 - ejemplo
 - send sync
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejemplos Send + Sync
La mayoría de los tipos que encuentras son 

## Send + Sync:
 - i8, f32, bool, char, &str, etc.
 - (T1, T2), [T; N], &[T], struct { x: T }, etc.
 - String, Option<T>, Vec<T>, Box<T>, etc.
 - Arc<T>: explícitamente seguro para los hilos mediante el recuento atómico de referencias.
 - Mutex<T>: explícitamente seguro para los hilos mediante bloqueo interno.
 - mpsc::Sender<T>: As of 1.72.0.
 - AtomicBool, AtomicU8, etc.: utiliza instrucciones atómicas especiales.

Los tipos genéricos suelen ser Send + Sync cuando los parámetros del tipo son Send + Sync.

## Send + !Sync
Estos tipos se pueden mover a otros hilos, pero no son seguros para los hilos. Normalmente, esto se debe a la mutabilidad interior:
 - mpsc::Receiver<T>
 - Cell<T>
 - RefCell<T>

## !Send + Sync
Estos tipos son seguros para los hilos (thread safe), pero no se pueden mover a otro hilo:
 - MutexGuard<T: Sync>: Uses OS level primitives which must be deallocated on the thread which created them.

## !Send + !Sync
Estos tipos no son seguros para los hilos y no se pueden mover a otros hilos:
 - Rc<T>: cada Rc<T> tiene una referencia a un RcBox<T>, que contiene un recuento de referencias no atómico.
 - *const T, *mut T: Rust asume que los punteros sin procesar pueden tener consideraciones especiales de concurrencia.
language&>es-ES<&