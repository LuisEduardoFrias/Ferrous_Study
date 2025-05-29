---
key: 67
name: mediator
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - mediador
 - comunicación
 - centralización
 - desacoplamiento
 - complejo
 - objetos
 - interfaz
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Mediator** (Mediador)
Es un patrón **de comportamiento** que tiene como objetivo **reducir el acoplamiento** entre un conjunto de objetos al centralizar la forma en que estos objetos se comunican. En lugar de que los objetos se comuniquen directamente entre sí (creando muchas dependencias y un sistema difícil de mantener), el mediador actúa como un centro de comunicación, y los objetos solo se comunican con el mediador.

Imagina un sistema de control de tráfico aéreo. Si cada avión tuviera que comunicarse directamente con todos los demás aviones para evitar colisiones, la complejidad sería inmensa. En cambio, existe una torre de control (el mediador) con la que cada avión se comunica. La torre de control recibe la información de todos los aviones y coordina sus movimientos, enviando instrucciones a los aviones individuales. Los aviones solo conocen la torre de control, no a los demás aviones.

 - title&>Este patrón es ideal cuando:
 - Un conjunto de objetos se comunica de maneras complejas y bien definidas.
 - Quieres **reducir las dependencias** entre los objetos.
 - Las clases que interactúan entre sí están muy acopladas y las modificaciones en una requieren cambios en muchas otras.

<br />

```rust
&title>Ejemplo de Mediator: Sistema de Diálogo de Usuario<title&
use std::rc::Rc;
use std::cell::RefCell;

// Trait Mediator: Define la interfaz para el mediador
trait DialogoMediator {
    fn notificar(&self, remitente: &str, evento: &str);
}

// Colleague (Componente): La interfaz común para los objetos que interactúan
trait ComponenteUI {
    fn set_mediator(&mut self, mediator: Rc<dyn DialogoMediator>);
    fn get_nombre(&self) -> &str;
    fn interactuar(&mut self, evento: &str);
}

// Colleague Concreto: Botón
struct Boton {
    nombre: String,
    mediator: Option<Rc<dyn DialogoMediator>>,
}

impl Boton {
    fn new(nombre: &str) -> Self {
        Boton {
            nombre: nombre.to_string(),
            mediator: None,
        }
    }

    fn click(&self) {
        println!("Boton '{}' ha sido clickeado.", self.nombre);
        if let Some(m) = &self.mediator {
            m.notificar(&self.nombre, "click");
        }
    }
}

impl ComponenteUI for Boton {
    fn set_mediator(&mut self, mediator: Rc<dyn DialogoMediator>) {
        self.mediator = Some(mediator);
    }
    fn get_nombre(&self) -> &str {
        &self.nombre
    }
    fn interactuar(&mut self, evento: &str) {
        println!("Boton '{}' recibió evento: {}", self.nombre, evento);
    }
}

// Colleague Concreto: Caja de Texto
struct CajaDeTexto {
    nombre: String,
    contenido: String,
    mediator: Option<Rc<dyn DialogoMediator>>,
}

impl CajaDeTexto {
    fn new(nombre: &str) -> Self {
        CajaDeTexto {
            nombre: nombre.to_string(),
            contenido: String::new(),
            mediator: None,
        }
    }

    fn set_contenido(&mut self, contenido: &str) {
        self.contenido = contenido.to_string();
        println!("Caja de Texto '{}' contenido cambiado a: '{}'.", self.nombre, self.contenido);
        if let Some(m) = &self.mediator {
            m.notificar(&self.nombre, "cambio_contenido");
        }
    }

    fn get_contenido(&self) -> &str {
        &self.contenido
    }
}

impl ComponenteUI for CajaDeTexto {
    fn set_mediator(&mut self, mediator: Rc<dyn DialogoMediator>) {
        self.mediator = Some(mediator);
    }
    fn get_nombre(&self) -> &str {
        &self.nombre
    }
    fn interactuar(&mut self, evento: &str) {
        println!("Caja de Texto '{}' recibió evento: {}", self.nombre, evento);
    }
}

// Mediador Concreto: Diálogo de Usuario
struct DialogoUsuario {
    // Usamos Rc<RefCell<T>> para permitir que el mediador tenga
    // referencias mutables a sus componentes y que los componentes
    // puedan tener referencias al mediador.
    boton_aceptar: Rc<RefCell<Boton>>,
    boton_cancelar: Rc<RefCell<Boton>>,
    caja_texto_nombre: Rc<RefCell<CajaDeTexto>>,
}

impl DialogoUsuario {
    fn new(
        boton_aceptar: Rc<RefCell<Boton>>,
        boton_cancelar: Rc<RefCell<Boton>>,
        caja_texto_nombre: Rc<RefCell<CajaDeTexto>>,
    ) -> Self {
        DialogoUsuario {
            boton_aceptar,
            boton_cancelar,
            caja_texto_nombre,
        }
    }
}

impl DialogoMediator for DialogoUsuario {
    // El método `notificar` es el centro de la lógica de comunicación
    fn notificar(&self, remitente_nombre: &str, evento: &str) {
        println!("\nMediador: Recibido evento '{}' de '{}'.", evento, remitente_nombre);

        if remitente_nombre == self.boton_aceptar.borrow().get_nombre() && evento == "click" {
            // Lógica cuando se clickea el botón "Aceptar"
            let nombre_ingresado = self.caja_texto_nombre.borrow().get_contenido().to_string();
            println!("Mediador: El botón 'Aceptar' fue clickeado. Nombre ingresado: '{}'.", nombre_ingresado);
            self.boton_cancelar.borrow().interactuar("desactivar"); // El mediador coordina otras interacciones
            // Aquí se podría llamar a un servicio, guardar datos, etc.

        } else if remitente_nombre == self.caja_texto_nombre.borrow().get_nombre() && evento == "cambio_contenido" {
            // Lógica cuando cambia el contenido de la caja de texto
            let contenido = self.caja_texto_nombre.borrow().get_contenido().to_string();
            if contenido.is_empty() {
                println!("Mediador: Contenido de la caja de texto vacío. Desactivando 'Aceptar'.");
                self.boton_aceptar.borrow().interactuar("desactivar");
            } else {
                println!("Mediador: Contenido de la caja de texto no vacío. Activando 'Aceptar'.");
                self.boton_aceptar.borrow().interactuar("activar");
            }
        }
        // ... otras lógicas para otros eventos o componentes ...
    }
}

fn main() {
    // 1. Crear los componentes
    let boton_aceptar_rc = Rc::new(RefCell::new(Boton::new("BotonAceptar")));
    let boton_cancelar_rc = Rc::new(RefCell::new(Boton::new("BotonCancelar")));
    let caja_texto_nombre_rc = Rc::new(RefCell::new(CajaDeTexto::new("CajaTextoNombre")));

    // 2. Crear el mediador
    let dialogo_mediator: Rc<dyn DialogoMediator> = Rc::new(DialogoUsuario::new(
        Rc::clone(&boton_aceptar_rc),
        Rc::clone(&boton_cancelar_rc),
        Rc::clone(&caja_texto_nombre_rc),
    ));

    // 3. Registrar el mediador en cada componente
    boton_aceptar_rc.borrow_mut().set_mediator(Rc::clone(&dialogo_mediator));
    boton_cancelar_rc.borrow_mut().set_mediator(Rc::clone(&dialogo_mediator));
    caja_texto_nombre_rc.borrow_mut().set_mediator(Rc::clone(&dialogo_mediator));

    println!("--- Simulando interacciones del usuario ---");

    // Interacción 1: La caja de texto cambia
    caja_texto_nombre_rc.borrow_mut().set_contenido("Alice");

    // Interacción 2: El usuario hace clic en el botón Aceptar
    boton_aceptar_rc.borrow().click();

    // Interacción 3: La caja de texto se vacía
    caja_texto_nombre_rc.borrow_mut().set_contenido("");

    // Interacción 4: El usuario intenta clickear Aceptar con la caja vacía (el mediador podría prevenirlo)
    boton_aceptar_rc.borrow().click();
}
```

language&>es-ES<&