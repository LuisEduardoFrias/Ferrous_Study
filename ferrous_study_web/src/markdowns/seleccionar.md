---
key: 121
name: seleccionar
addData: 3/07/2025
updateData: null
keywords: 
 - seleccionar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Seleccionar
Una operación select espera hasta que un conjunto de futuros esté listo y responde al resultado de ese futuro. En JavaScript, esto es similar a Promise.race. En Python, se compara con asyncio.wait(task_set, return_when=asyncio.FIRST_COMPLETED).

Similar to a match statement, the body of select! has a number of arms, each of the form pattern = future => statement. When a future is ready, its return value is destructured by the pattern. The statement is then run with the resulting variables. The statement result becomes the result of the select! macro.

```rust
use tokio::sync::mpsc::{self, Receiver};
use tokio::time::{sleep, Duration};

#[derive(Debug, PartialEq)]
enum Animal {
    Cat { name: String },
    Dog { name: String },
}

async fn first_animal_to_finish_race(
    mut cat_rcv: Receiver<String>,
    mut dog_rcv: Receiver<String>,
) -> Option<Animal> {
    tokio::select! {
        cat_name = cat_rcv.recv() => Some(Animal::Cat { name: cat_name? }),
        dog_name = dog_rcv.recv() => Some(Animal::Dog { name: dog_name? })
    }
}

#[tokio::main]
async fn main() {
    let (cat_sender, cat_receiver) = mpsc::channel(32);
    let (dog_sender, dog_receiver) = mpsc::channel(32);
    tokio::spawn(async move {
        sleep(Duration::from_millis(500)).await;
        cat_sender.send(String::from("Felix")).await.expect("No se ha podido enviar el gato.");
    });
    tokio::spawn(async move {
        sleep(Duration::from_millis(50)).await;
        dog_sender.send(String::from("Rex")).await.expect("No se ha podido enviar el perro.");
    });

    let winner = first_animal_to_finish_race(cat_receiver, dog_receiver)
        .await
        .expect("No se ha podido recibir el ganador");

    println!("El ganador es {winner:?}");
}
```

 - En este ejemplo, tenemos una carrera entre un gato y un perro. first_animal_to_finish_race escucha a ambos canales y elige el que llegue primero. Como el perro tarda 50 ms, gana al gato, que tarda 500 ms.
 - En este ejemplo, puedes usar canales oneshot, ya que se supone que solo recibirán un send.
 - Prueba a añadir un límite a la carrera y demuestra cómo se seleccionan distintos tipos de futuros.
 - Ten en cuenta que select! elimina las ramas sin coincidencias, cancelando así sus futuros. Es más fácil de usar cuando cada ejecución de select! crea futuros.
   - También puedes enviar &mut future en lugar del futuro en sí, pero esto podría provocar problemas, como se explica más adelante en la diapositiva sobre pines.

language&>es-ES<&