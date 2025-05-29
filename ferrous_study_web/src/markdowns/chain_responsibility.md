---
key: 63
name: chain_of_responsibility
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - cadena
 - responsabilidad
 - desacoplamiento
 - solicitud
 - handlers
 - procesamiento
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Chain of Responsibility** (Cadena de Responsabilidad)
Es un patrón **de comportamiento** que te permite pasar solicitudes a lo largo de una cadena de *handlers* (manejadores). Cada *handler* decide si procesa la solicitud o la pasa al siguiente *handler* en la cadena.

Imagina un sistema de aprobación de solicitudes de compra en una empresa. Una solicitud de bajo valor podría ser aprobada por un gerente de departamento, una de valor medio por un director, y una de alto valor por la junta directiva. En lugar de que el código que envía la solicitud sepa quién debe aprobarla, puedes configurar una cadena donde cada "aprobador" es un *handler*. La solicitud se envía al primer aprobador; si este no puede manejarla, la pasa al siguiente, y así sucesivamente.

Este patrón **desacopla el emisor de una solicitud de sus receptores**. Puedes añadir o quitar *handlers* de la cadena de forma dinámica, y el orden de los *handlers* se puede modificar. Esto hace que el sistema sea muy flexible para manejar diferentes tipos de solicitudes o para aplicar diferentes lógicas de procesamiento según las condiciones.

```rust
&title>Ejemplo de Chain of Responsibility: Sistema de Aprobación de Compras<title&

// Trait Handler: Define la interfaz para los manejadores de la cadena
trait Aprobador {
    fn procesar_solicitud(&mut self, monto: u32);
    fn set_siguiente(&mut self, siguiente: Box<dyn Aprobador>);
}

// Handler Concreto: Gerente
struct Gerente {
    nombre: String,
    siguiente: Option<Box<dyn Aprobador>>,
}

impl Gerente {
    fn new(nombre: &str) -> Self {
        Gerente {
            nombre: nombre.to_string(),
            siguiente: None,
        }
    }
}

impl Aprobador for Gerente {
    fn procesar_solicitud(&mut self, monto: u32) {
        if monto <= 1000 {
            println!("{} aprobó la solicitud de ${}.", self.nombre, monto);
        } else if let Some(s) = self.siguiente.as_mut() {
            println!("{} no puede aprobar ${}. Pasando al siguiente aprobador...", self.nombre, monto);
            s.procesar_solicitud(monto);
        } else {
            println!("{} no puede aprobar ${}. No hay más aprobadores en la cadena.", self.nombre, monto);
        }
    }

    fn set_siguiente(&mut self, siguiente: Box<dyn Aprobador>) {
        self.siguiente = Some(siguiente);
    }
}

// Handler Concreto: Director
struct Director {
    nombre: String,
    siguiente: Option<Box<dyn Aprobador>>,
}

impl Director {
    fn new(nombre: &str) -> Self {
        Director {
            nombre: nombre.to_string(),
            siguiente: None,
        }
    }
}

impl Aprobador for Director {
    fn procesar_solicitud(&mut self, monto: u32) {
        if monto <= 5000 {
            println!("{} aprobó la solicitud de ${}.", self.nombre, monto);
        } else if let Some(s) = self.siguiente.as_mut() {
            println!("{} no puede aprobar ${}. Pasando al siguiente aprobador...", self.nombre, monto);
            s.procesar_solicitud(monto);
        } else {
            println!("{} no puede aprobar ${}. No hay más aprobadores en la cadena.", self.nombre, monto);
        }
    }

    fn set_siguiente(&mut self, siguiente: Box<dyn Aprobador>) {
        self.siguiente = Some(siguiente);
    }
}

// Handler Concreto: CEO
struct Ceo {
    nombre: String,
    siguiente: Option<Box<dyn Aprobador>>, // CEO es el último en la cadena, su `siguiente` será None
}

impl Ceo {
    fn new(nombre: &str) -> Self {
        Ceo {
            nombre: nombre.to_string(),
            siguiente: None,
        }
    }
}

impl Aprobador for Ceo {
    fn procesar_solicitud(&mut self, monto: u32) {
        if monto <= 10000 { // El CEO puede aprobar hasta 10000
            println!("{} aprobó la solicitud de ${}.", self.nombre, monto);
        } else if let Some(s) = self.siguiente.as_mut() { // Si por alguna razón hay otro
            println!("{} no puede aprobar ${}. Pasando al siguiente aprobador...", self.nombre, monto);
            s.procesar_solicitud(monto);
        }
        else {
            println!("{} no puede aprobar ${}. Solicitud de monto demasiado alto o no hay más aprobadores.", self.nombre, monto);
        }
    }

    fn set_siguiente(&mut self, siguiente: Box<dyn Aprobador>) {
        self.siguiente = Some(siguiente);
    }
}


fn main() {
    // Construimos la cadena de responsabilidad
    let mut gerente = Gerente::new("Carlos (Gerente)");
    let mut director = Director::new("Ana (Directora)");
    let mut ceo = Ceo::new("Juan (CEO)");

    // Establecemos el orden de la cadena
    // Gerente -> Director -> CEO
    gerente.set_siguiente(Box::new(director));
    // La cadena completa: Gerente -> Director -> CEO
    // Ahora, `gerente` es el punto de entrada a la cadena.
    // Para simplificar la propiedad, la cadena se construye de forma lineal
    // El ejemplo demuestra la delegación. En un sistema real, podrías usar `Rc<RefCell<...>>`
    // o `Arc<Mutex<...>>` para construir cadenas más complejas o dinámicas en Rust.

    // Vamos a crear una lista de aprobadores para simular la cadena
    // (Esto es una forma de manejar la propiedad en Rust para este patrón,
    // ya que 'siguiente' requiere ownership o smart pointers complejos)
    let mut gerente_chain = Gerente::new("Carlos (Gerente)");
    let mut director_chain = Director::new("Ana (Directora)");
    let mut ceo_chain = Ceo::new("Juan (CEO)");

    // El CEO no tiene a nadie después de él, así que no le ponemos un siguiente.
    director_chain.set_siguiente(Box::new(ceo_chain));
    gerente_chain.set_siguiente(Box::new(director_chain));

    println!("--- Procesando Solicitudes ---");

    println!("\nSolicitud: $500");
    gerente_chain.procesar_solicitud(500);

    // Reconstruir la cadena para el siguiente test o usar smart pointers
    let mut gerente_chain = Gerente::new("Carlos (Gerente)");
    let mut director_chain = Director::new("Ana (Directora)");
    let mut ceo_chain = Ceo::new("Juan (CEO)");
    director_chain.set_siguiente(Box::new(ceo_chain));
    gerente_chain.set_siguiente(Box::new(director_chain));

    println!("\nSolicitud: $3000");
    gerente_chain.procesar_solicitud(3000);

    // Reconstruir la cadena
    let mut gerente_chain = Gerente::new("Carlos (Gerente)");
    let mut director_chain = Director::new("Ana (Directora)");
    let mut ceo_chain = Ceo::new("Juan (CEO)");
    director_chain.set_siguiente(Box::new(ceo_chain));
    gerente_chain.set_siguiente(Box::new(director_chain));

    println!("\nSolicitud: $8000");
    gerente_chain.procesar_solicitud(8000);

    // Reconstruir la cadena
    let mut gerente_chain = Gerente::new("Carlos (Gerente)");
    let mut director_chain = Director::new("Ana (Directora)");
    let mut ceo_chain = Ceo::new("Juan (CEO)");
    director_chain.set_siguiente(Box::new(ceo_chain));
    gerente_chain.set_siguiente(Box::new(director_chain));

    println!("\nSolicitud: $12000"); // Demasiado alta para cualquier aprobador
    gerente_chain.procesar_solicitud(12000);
}
```
language&>es-ES<&