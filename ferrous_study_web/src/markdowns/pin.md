---
key: 123
name: pin
addData: 3/07/2025
updateData: null
keywords: 
 - pin
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Pin
Los bloques y las funciones asíncronos devuelven tipos que implementan el trait Future. El tipo devuelto es el resultado de una transformación del compilador que convierte las variables locales en datos almacenados en el futuro.

Algunas de estas variables pueden dirigir punteros a otras variables locales. Por este motivo, el futuro nunca debería trasladarse a otra ubicación de memoria, ya que esta acción invalidaría esos punteros.

Para evitar que el tipo futuro se mueva en la memoria, solo se puede sondear mediante un puntero fijado. Pin es un envoltorio que rodea a una referencia y que no permite todas las operaciones que moverían la instancia a la que apunta a otra ubicación de memoria.

```rust
use tokio::sync::{mpsc, oneshot};
use tokio::task::spawn;
use tokio::time::{sleep, Duration};

// Un elemento de trabajo. En este caso, solo se duerme durante un tiempo determinado y responde
// con un mensaje en el canal `respond_on`.
#[derive(Debug)]
struct Work {
    input: u32,
    respond_on: oneshot::Sender<u32>,
}

// Un trabajador que espera trabajo en una cola y lo ejecuta.
async fn worker(mut work_queue: mpsc::Receiver<Work>) {
    let mut iterations = 0;
    loop {
        tokio::select! {
            Some(work) = work_queue.recv() => {
                sleep(Duration::from_millis(10)).await; // Simula que trabaja.
                work.respond_on
                    .send(work.input * 1000)
                    .expect("no se ha podido enviar la respuesta");
                iterations += 1;
            }
            // TODO: informar del número de iteraciones cada 100 ms
        }
    }
}

// Un solicitante que pide trabajo y espera a que se complete.
async fn do_work(work_queue: &mpsc::Sender<Work>, input: u32) -> u32 {
    let (tx, rx) = oneshot::channel();
    work_queue
        .send(Work { input, respond_on: tx })
        .await
        .expect("no se ha podido enviar en la cola de trabajo");
    rx.await.expect("no se ha podido esperar la respuesta")
}

#[tokio::main]
async fn main() {
    let (tx, rx) = mpsc::channel(10);
    spawn(worker(rx));
    for i in 0..100 {
        let resp = do_work(&tx, i).await;
        println!("resultado del trabajo de la iteración {i}: {resp}");
    }
}
```

 - Puede que reconozcas esto como un ejemplo del patrón actor. Los actores suelen llamar a select! en un bucle.
 - Esta sección es un resumen de algunas de las lecciones anteriores, así que tómate tu tiempo .
   - Si añade un _ = sleep(Duration::from_millis(100)) => { println!(..) } a select!, nunca se ejecutará. ¿Por qué?
   - En su lugar, añade un timeout_fut que contenga ese futuro fuera de loop:

```rudt
let timeout_fut = sleep(Duration::from_millis(100));
loop {
    select! {
        ..,
        _ = timeout_fut => { println!(..); },
    }
}
```

   - Continuará sin funcionar. Sigue los errores del compilador y añade &mut a timeout_fut en select! para ir despejando el problema. A continuación, usa Box::pin:

```rust
let mut timeout_fut = Box::pin(sleep(Duration::from_millis(100)));
loop {
    select! {
        ..,
        _ = &mut timeout_fut => { println!(..); },
    }
}
```

   - This compiles, but once the timeout expires it is Poll::Ready on every iteration (a fused future would help with this). Update to reset timeout_fut every time it expires:

```rust
let mut timeout_fut = Box::pin(sleep(Duration::from_millis(100)));
loop {
    select! {
        _ = &mut timeout_fut => {
            println!(..);
            timeout_fut = Box::pin(sleep(Duration::from_millis(100)));
        },
    }
}
```

 - Box se asigna en el montículo. En algunos casos, std::pin::pin! (solo si se ha estabilizado recientemente, con código antiguo que suele utilizar tokio::pin!) también es una opción, pero difícil de utilizar en un futuro que se reasigna.
 - Otra alternativa es no utilizar pin, sino generar otra tarea que se enviará a un canal de oneshot cada 100 ms.
 - Los datos que contienen punteros a sí mismos se denominan autoreferenciales. Normalmente, el verificador de préstamos de Rust evitaría que se movieran los datos de autorreferencia, ya que las referencias no pueden tener una duración mayor que la de los datos a los que apuntan. Sin embargo, el verificador de préstamos no verifica la transformación del código de las funciones y los bloques asíncronos.
 - Pin es un envoltorio que rodea a una referencia. No se puede mover un objeto desde su lugar mediante un puntero fijado. Sin embargo, sí se puede mover mediante un puntero no fijado.
 - El método poll del trait Future utiliza Pin<&mut Self> en lugar de &mut Self para hacer referencia a la instancia. Por eso solo se puede llamar desde un puntero fijado.
language&>es-ES<&