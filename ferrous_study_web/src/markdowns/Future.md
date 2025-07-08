---
key: 115
name: Future
addData: 3/07/2025
updateData: null
keywords: 
 - future
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Future
Future es un trait implementado por objetos que representan una operación que puede que aún no se haya completado. Se puede sondear un futuro y poll devuelve un Poll.

```rust
use std::pin::Pin;
use std::task::Context;

pub trait Future {
    type Output;
    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
}

pub enum Poll<T> {
    Ready(T),
    Pending,
}
```

Una función asíncrona devuelve impl Future. También es posible (aunque no es habitual) implementar Future para tus propios tipos. Por ejemplo, el JoinHandle devuelto por tokio::spawn implementa Future para permitir que se una a él.

La palabra clave .await, aplicada a un futuro, provoca que la función asíncrona se detenga hasta que dicho futuro esté listo y, a continuación, se evalúa su salida.

 - Los tipos Future y Polll se implementan exactamente como se indica. Haz clic en los enlaces para mostrar las implementaciones en los documentos.
 - No trataremos Pin ni Context, ya que nos centraremos en escribir código asíncrono en lugar de compilar nuevos primitivos asíncronos. Brevemente:
 - Context permite que un futuro se programe a sí mismo para que se vuelva a sondear cuando se produzca un evento.
 - Pin asegura que el futuro no se mueva en la memoria, de forma que los punteros en ese futuro siguen siendo válidos. Esto es necesario para que las referencias sigan siendo válidas después de .await.

language&>es-ES<&