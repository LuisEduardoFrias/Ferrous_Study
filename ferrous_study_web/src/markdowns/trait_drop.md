---
key: 122
name: trait_drop
addData: 07/06/2025
updateData: null
keywords: 
 - trait
 - drop
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El Trait Drop
Los valores que implementan Drop pueden especificar el código que se ejecutará cuando salgan del ámbito:

```rust
struct Droppable {
    name: &'static str,
}

impl Drop for Droppable {
    fn drop(&mut self) {
        println!("Suprimiendo {}", self.name);
    }
}

fn main() {
    let a = Droppable { name: "a" };
    {
        let b = Droppable { name: "b" };
        {
            let c = Droppable { name: "c" };
            let d = Droppable { name: "d" };
            println!("Saliendo del bloque B");
        }
        println!("Saliendo del bloque A");
    }
    drop(a);
    println!("Saliendo de la página principal");
}
```

Ten en cuenta que std::mem::drop no es igual que std::ops::Drop::drop.
Los valores se suprimen automáticamente cuando salen del ámbito.
Cuando se elimina un valor, si implementa std::ops::Drop, se llamará a su implementación Drop::drop.
También se suprimirán todos sus campos, independientemente de si implementa o no Drop.
std::mem::drop es solo una función vacía que toma cualquier valor. Es importante saber que toma la propiedad del valor, por lo que se descarta al final de su ámbito. Se trata de una forma sencilla de suprimir los valores de forma explícita antes que si se salen de su ámbito.
Esta acción puede ser útil para los objetos que trabajan con drop, como liberando bloqueos, cerrando archivos, etc.
Cuestiones de debate:

¿Por qué Drop::drop no acepta self?
Respuesta corta: si lo hiciera, std::mem::drop sería llamado al final del bloque, lo que daría como resultado otra llamada a Drop::drop, ¡y un desbordamiento del stack!
Prueba a sustituir drop(a) por a.drop().
language&>es-ES<&