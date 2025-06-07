---
key: 84
name: traits
addData: 06/06/2025
updateData: null
keywords: 
 - traits
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Traits
Rust te permite abstraer sobre tipos con traits. Son similares a las interfaces:

```rust
trait Pet {
    /// Devuelve una frase de esta mascota.
    fn talk(&self) -> String;

    /// Imprime un saludo a la mascota en una salida estándar.
    fn greet(&self);
}
```
Un trait define una serie de métodos que los tipos deben tener para implementar el trait.

En la sección de “Genéricos” a seguir, veremos como construir funcionalidad que es genérico sobre todos los tipos implementando un trait.

## Implementación de Traits

```rust
trait Pet {
    fn talk(&self) -> String;

    fn greet(&self) {
        println!("¡Eres una monada! ¿Cómo te llamas? {}", self.talk());
    }
}

struct Dog {
    name: String,
    age: i8,
}

impl Pet for Dog {
    fn talk(&self) -> String {
        format!("¡Guau, me llamo {}!", self.name)
    }
}

fn main() {
    let fido = Dog { name: String::from("Fido"), age: 5 };
    fido.greet();
}
```

Para implementar Trait para un tipo Type, utiliza un bloque impl Trait for Type { .. }.

A diferencia de los interfases de Go, tener los métodos adecuados no es suficiente: un tipo Cat con un método talk() no satisface Pet automáticamente al menos que este en un bloque impl Pet.

Los traits pueden especificar implementaciones predeterminadas de algunos métodos. Implementaciones predeterminadas pueden usar todos los métodos de
un trait (incluso los métodos que los usuarios deben implementar ellos mismos). En este caso, greet es predeterminado y utiliza talk.

language&>es-ES<&