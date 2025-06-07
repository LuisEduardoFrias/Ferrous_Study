---
key: 83
name: metodos
addData: 06/06/2025
updateData: null
keywords: 
 - metodos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Métodos
Rust te permite asociar funciones a los nuevos tipos. Para ello, usa un bloque impl:

```rust
#[derive(Debug)]
struct Race {
    name: String,
    laps: Vec<i32>,
}

impl Race {
    // No hay receptor, método estático
    fn new(name: &str) -> Self {
        Self { name: String::from(name), laps: Vec::new() }
    }

    // Acceso exclusivo de lectura/escritura prestado a self
    fn add_lap(&mut self, lap: i32) {
        self.laps.push(lap);
    }

    // Acceso compartido y de solo lectura prestado a self
    fn print_laps(&self) {
        println!("Se han registrado {} vueltas de {}:", self.laps.len(), self.name);
        for (idx, lap) in self.laps.iter().enumerate() {
            println!("Vuelta {idx}: {lap} s");
        }
    }

    // Propiedad exclusiva de self
    fn finish(self) {
        let total: i32 = self.laps.iter().sum();
        println!("La carrera {} ha terminado. Duración total de la vuelta: {}.", self.name, total);
    }
}

fn main() {
    let mut race = Race::new("Gran Premio de Mónaco");
    race.add_lap(70);
    race.add_lap(68);
    race.print_laps();
    race.add_lap(71);
    race.print_laps();
    race.finish();
    // race.add_lap(42);
}
```

El argumento self denomina el “receiver” (receptor) - el objeto sobre cual el método actuará. Hay varios receivers comunes para un método:

&self: toma prestado el objeto del llamador utilizando una referencia compartida e inmutable. El objeto se puede volver a utilizar después.
&mut self: toma prestado el objeto del llamador mediante una referencia única y mutable. El objeto se puede volver a utilizar después.
self: asume el ownership del objeto y lo aleja del llamador. El método se convierte en el propietario del objeto. El objeto se eliminará (es decir, se anulará la asignación) cuando el método devuelva un resultado, a menos que se transmita su ownership de forma explícita. El ownership completa no implica automáticamente una mutabilidad.
mut self: igual que lo anterior, pero el método puede mutar el objeto.
Sin receptor: se convierte en un método estático de la estructura. Normalmente se utiliza para crear constructores que se suelen denominar new.

Puntos Clave:

Puede resultar útil presentar los métodos comparándolos con funciones.
Se llama a los métodos en una instancia de un tipo (como un estructura o una enumeración) y el primer parámetro representa la instancia como self.
Los desarrolladores pueden optar por utilizar métodos para aprovechar la sintaxis de los receptores de métodos y para ayudar a mantenerlos más organizados. Mediante el uso de métodos podemos mantener todo el código de implementación en un lugar predecible.
Señala el uso de la palabra clave self, el receptor de un método.
Indica que se trata de un término abreviado de self: Self y tal vez muestra cómo se podría utilizar también el nombre de la estructura.
Explica que Self es un tipo de alias para el tipo en el que está el bloque impl y que se puede usar en cualquier parte del bloque.
Ten en cuenta que se puede usar self como otras estructuras y que la notación de puntos puede utilizarse para referirse a campos concretos.
Puede ser un buen momento para mostrar la diferencia entre &self y self modificando el código e intentando ejecutar finish dos veces.
Además de las variantes self, también hay tipos de envoltorios especiales que pueden ser tipos de receptor, como Box<Self>.

language&>es-ES<&