---
key: 64
name: command
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - comando
 - encapsulación
 - acción
 - invoker
 - receiver
 - historial
 - deshacer
 - rehacer
 - cola
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Command** (Comando)
Es un patrón **de comportamiento** que **encapsula una solicitud como un objeto**, permitiendo así parametrizar clientes con diferentes solicitudes, poner solicitudes en una cola o registrar sus operaciones, y soportar operaciones de deshacer (undo).

Imagina un editor de texto donde cada acción que realizas (cortar, pegar, escribir un carácter) se puede representar como un "comando". En lugar de llamar directamente a los métodos de un objeto, creas un objeto de comando que contiene la acción y el receptor (el objeto que realizará la acción). Luego, un "invoker" (el menú o un botón) simplemente ejecuta el comando sin saber los detalles de cómo se realiza la operación.

 - title&>Este patrón es ideal para:
 - **Deshacer/Rehacer:** Almacenar una lista de objetos comando ejecutados permite revertirlos o reejecutarlos.
 - **Colas de tareas:** Los comandos pueden ser encolados y ejecutados en un orden específico o en un hilo separado.
 - **Registro de operaciones:** Los comandos pueden ser guardados para auditoría o para replicar acciones.
 - **Configuración de elementos de UI:** Un botón o un elemento de menú puede ser fácilmente configurado con diferentes comandos.

<br />

```rust
&title>Ejemplo de Command: Control Remoto de Dispositivos Electrónicos<title&

// Receptor: Los dispositivos que realizarán las acciones
struct Luz {
    nombre: String,
    encendida: bool,
}

impl Luz {
    fn new(nombre: &str) -> Self {
        Luz {
            nombre: nombre.to_string(),
            encendida: false,
        }
    }

    fn encender(&mut self) {
        self.encendida = true;
        println!("Luz '{}' encendida.", self.nombre);
    }

    fn apagar(&mut self) {
        self.encendida = false;
        println!("Luz '{}' apagada.", self.nombre);
    }
}

struct Termostato {
    temperatura: i32,
}

impl Termostato {
    fn new() -> Self {
        Termostato { temperatura: 20 }
    }

    fn subir_temperatura(&mut self, grados: i32) {
        self.temperatura += grados;
        println!("Termostato: Temperatura subida a {}°C.", self.temperatura);
    }

    fn bajar_temperatura(&mut self, grados: i32) {
        self.temperatura -= grados;
        println!("Termostato: Temperatura bajada a {}°C.", self.temperatura);
    }
}


// Interfaz Command: Define el método 'ejecutar'
trait Comando {
    fn ejecutar(&mut self);
    // Para deshacer, podríamos añadir:
    // fn deshacer(&mut self);
}

// Comandos Concretos: Encapsulan una solicitud a un receptor específico
struct ComandoEncenderLuz {
    luz: Rc<RefCell<Luz>>, // Usamos Rc<RefCell> para compartir Luz mutable
}

impl ComandoEncenderLuz {
    fn new(luz: Rc<RefCell<Luz>>) -> Self {
        ComandoEncenderLuz { luz }
    }
}

impl Comando for ComandoEncenderLuz {
    fn ejecutar(&mut self) {
        self.luz.borrow_mut().encender();
    }
}

struct ComandoApagarLuz {
    luz: Rc<RefCell<Luz>>,
}

impl ComandoApagarLuz {
    fn new(luz: Rc<RefCell<Luz>>) -> Self {
        ComandoApagarLuz { luz }
    }
}

impl Comando for ComandoApagarLuz {
    fn ejecutar(&mut self) {
        self.luz.borrow_mut().apagar();
    }
}

struct ComandoSubirTemperatura {
    termostato: Rc<RefCell<Termostato>>,
    grados: i32,
}

impl ComandoSubirTemperatura {
    fn new(termostato: Rc<RefCell<Termostato>>, grados: i32) -> Self {
        ComandoSubirTemperatura { termostato, grados }
    }
}

impl Comando for ComandoSubirTemperatura {
    fn ejecutar(&mut self) {
        self.termostato.borrow_mut().subir_temperatura(self.grados);
    }
}

// Invoker: El objeto que solicita la ejecución del comando (el control remoto)
struct ControlRemoto {
    boton_slot: Option<Box<dyn Comando>>,
}

impl ControlRemoto {
    fn new() -> Self {
        ControlRemoto {
            boton_slot: None,
        }
    }

    fn set_comando(&mut self, comando: Box<dyn Comando>) {
        self.boton_slot = Some(comando);
    }

    fn presionar_boton(&mut self) {
        if let Some(comando) = &mut self.boton_slot {
            comando.ejecutar();
        } else {
            println!("No hay comando asignado al botón.");
        }
    }
}

use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    // Receptores
    let luz_sala = Rc::new(RefCell::new(Luz::new("Luz de Sala")));
    let luz_cocina = Rc::new(RefCell::new(Luz::new("Luz de Cocina")));
    let termostato_principal = Rc::new(RefCell::new(Termostato::new()));

    // Comandos
    let comando_encender_luz_sala = Box::new(ComandoEncenderLuz::new(Rc::clone(&luz_sala)));
    let comando_apagar_luz_sala = Box::new(ComandoApagarLuz::new(Rc::clone(&luz_sala)));
    let comando_encender_luz_cocina = Box::new(ComandoEncenderLuz::new(Rc::clone(&luz_cocina)));
    let comando_subir_temp = Box::new(ComandoSubirTemperatura::new(Rc::clone(&termostato_principal), 2));
    let comando_bajar_temp = Box::new(ComandoSubirTemperatura::new(Rc::clone(&termostato_principal), -3));

    // Invoker
    let mut control = ControlRemoto::new();

    println!("--- Operaciones con el Control Remoto ---");

    control.set_comando(comando_encender_luz_sala);
    control.presionar_boton();

    control.set_comando(comando_subir_temp);
    control.presionar_boton();

    control.set_comando(comando_encender_luz_cocina);
    control.presionar_boton();

    control.set_comando(comando_apagar_luz_sala);
    control.presionar_boton();

    control.set_comando(comando_bajar_temp);
    control.presionar_boton();

    println!("\n--- Estado final de los dispositivos ---");
    println!("Luz de Sala: {}", luz_sala.borrow().encendida);
    println!("Luz de Cocina: {}", luz_cocina.borrow().encendida);
    println!("Termostato: {}°C", termostato_principal.borrow().temperatura);

    // Un ejemplo de cómo los comandos podrían ser encolados o registrados
    let mut historial_comandos: Vec<Box<dyn Comando>> = Vec::new();
    historial_comandos.push(Box::new(ComandoEncenderLuz::new(Rc::clone(&luz_sala))));
    historial_comandos.push(Box::new(ComandoSubirTemperatura::new(Rc::clone(&termostato_principal), 5)));
    historial_comandos.push(Box::new(ComandoApagarLuz::new(Rc::clone(&luz_sala))));

    println!("\n--- Replay de historial de comandos ---");
    for mut cmd in historial_comandos {
        cmd.ejecutar();
    }
}
```

language&>es-ES<&

