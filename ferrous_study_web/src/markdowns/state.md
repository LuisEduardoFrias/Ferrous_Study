---
key: 70
name: state
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - estado
 - máquina de estados
 - contexto
 - encapsulamiento
 - transición
 - comportamiento variable
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **State** (Estado)
Es un patrón **de comportamiento** que permite que un objeto altere su comportamiento cuando su estado interno cambia. Parece que el objeto cambia su clase, pero en realidad, es su objeto de estado el que cambia. Es decir, un objeto cambia su comportamiento de forma transparente para el cliente según el estado en el que se encuentre.

Imagina un objeto `ReproductorDeAudio` que puede estar en diferentes estados: `Reproduciendo`, `Pausado`, `Detenido`. El comportamiento del método `presionar_boton_reproducir()` será diferente en cada estado:
 - Si está `Detenido`, empezará a reproducir.
 - Si está `Reproduciendo`, se pausará.
 - Si está `Pausado`, reanudará la reproducción.


Sin el patrón State, podrías terminar con muchas sentencias `if/else` o `match` dentro de los métodos del `ReproductorDeAudio` para verificar el estado actual y decidir qué hacer. Esto hace que el código sea difícil de leer, mantener y extender. El patrón State resuelve esto encapsulando el comportamiento específico de cada estado en objetos de estado separados. El `ReproductorDeAudio` (el **Contexto**) delega sus operaciones al objeto de estado actual, y las transiciones entre estados se gestionan por los propios objetos de estado o por el contexto.

Este patrón mejora la **cohesión** (cada estado es responsable de su propio comportamiento) y reduce el **acoplamiento** (el contexto no necesita saber los detalles de implementación de cada estado).

```rust
&title>Ejemplo de State: Control de un Interruptor de Luz<title&

use std::rc::Rc;
use std::cell::RefCell;

// Trait State: Define la interfaz común para todos los estados concretos
trait EstadoInterruptor {
    fn encender(&self, interruptor: Rc<RefCell<Interruptor>>);
    fn apagar(&self, interruptor: Rc<RefCell<Interruptor>>);
}

// Estado Concreto: Encendido
struct EstadoEncendido;
impl EstadoInterruptor for EstadoEncendido {
    fn encender(&self, _interruptor: Rc<RefCell<Interruptor>>) {
        println!("Luz ya está encendida. No hago nada.");
    }

    fn apagar(&self, interruptor: Rc<RefCell<Interruptor>>) {
        println!("Apagando la luz...");
        // Transición de estado: Cambiamos el estado del Contexto
        interruptor.borrow_mut().set_estado(Rc::new(EstadoApagado));
    }
}

// Estado Concreto: Apagado
struct EstadoApagado;
impl EstadoInterruptor for EstadoApagado {
    fn encender(&self, interruptor: Rc<RefCell<Interruptor>>) {
        println!("Encendiendo la luz...");
        // Transición de estado: Cambiamos el estado del Contexto
        interruptor.borrow_mut().set_estado(Rc::new(EstadoEncendido));
    }

    fn apagar(&self, _interruptor: Rc<RefCell<Interruptor>>) {
        println!("Luz ya está apagada. No hago nada.");
    }
}

// Contexto: Contiene el estado actual y delega las operaciones a él
struct Interruptor {
    // Usamos Rc<dyn EstadoInterruptor> para permitir el cambio de estado
    // y compartir la referencia al estado actual.
    // En un sistema real, un `Arc<Mutex<dyn EstadoInterruptor>>` podría ser necesario
    // si el estado puede ser compartido entre hilos, o un `RefCell` si es solo para un hilo.
    estado_actual: Rc<dyn EstadoInterruptor>,
}

impl Interruptor {
    fn new() -> Self {
        // Estado inicial: Apagado
        Interruptor {
            estado_actual: Rc::new(EstadoApagado),
        }
    }

    // Permite al contexto cambiar su estado
    fn set_estado(&mut self, nuevo_estado: Rc<dyn EstadoInterruptor>) {
        self.estado_actual = nuevo_estado;
    }

    // Delega la operación 'encender' al objeto de estado actual
    fn encender(&self) {
        // Necesitamos clonar la referencia Rc para pasarla al método del estado,
        // ya que el método del estado puede necesitar cambiar el estado del Interruptor.
        // `Rc<RefCell<Interruptor>>` permite que el estado mute el interruptor.
        self.estado_actual.encender(Rc::new(RefCell::new(self.clone()))); // Simulación de pasar self mutable.
        // Nota: En Rust, pasar `self` (el Contexto) a los estados de esta manera
        // requiere cuidado con el ownership y los préstamos. Rc<RefCell<T>> es la
        // forma idiomática de permitir mutabilidad compartida dentro de un solo hilo.
        // Aquí lo simplifico para el concepto.
    }

    // Delega la operación 'apagar' al objeto de estado actual
    fn apagar(&self) {
        self.estado_actual.apagar(Rc::new(RefCell::new(self.clone()))); // Simulación de pasar self mutable
    }
}

// NOTA IMPORTANTE PARA RUST:
// La implementación directa de "estado" en Rust requiere el uso de smart pointers
// como `Rc<RefCell<T>>` (para un solo hilo) o `Arc<Mutex<T>>` (para múltiples hilos)
// para permitir que el objeto de estado pueda modificar el contexto, y que el contexto
// pueda tener una referencia al estado que cambia.
// El ejemplo de arriba simplifica `Rc::new(RefCell::new(self.clone()))` para ilustrar
// el concepto de delegación. En un caso real, el `Interruptor` mismo sería `Rc<RefCell<Interruptor>>`
// y se pasaría como tal a los métodos de estado.

// Implementación más idiomática del contexto y su interacción con el estado:
struct InterruptorReal {
    estado_actual: Rc<RefCell<dyn EstadoInterruptor>>,
}

impl InterruptorReal {
    fn new() -> Self {
        InterruptorReal {
            estado_actual: Rc::new(RefCell::new(EstadoApagado)),
        }
    }

    fn set_estado(&mut self, nuevo_estado: Rc<RefCell<dyn EstadoInterruptor>>) {
        self.estado_actual = nuevo_estado;
    }

    // Métodos del contexto que delegan al estado
    fn encender(&self) {
        // Necesitamos una referencia al "self" del InterruptorReal para que el estado pueda mutarlo
        let self_ref = Rc::new(RefCell::new(Self { estado_actual: Rc::clone(&self.estado_actual) })); // Crear una referencia mutua
        
        // Simulación: En un diseño más limpio, el `InterruptorReal` sería el `Rc<RefCell<InterruptorReal>>`
        // que se pasaría. La forma más robusta requiere que `InterruptorReal` se envuelva en `Rc<RefCell>`
        // en `main` y se pase esa referencia.
        
        // Para este ejemplo, haremos una "trampa" conceptual para demostrar la delegación.
        // En un caso real, los métodos `encender` y `apagar` deberían tomar `&mut self`
        // y el `EstadoInterruptor` tendría métodos que tomasen `&mut self` o `&RefCell<InterruptorReal>`.
        // Rust tiene un sistema de tipos estricto para evitar ciclos de referencias mutables sin control.
        
        // Aquí, simplemente llamamos al método del estado directamente.
        // La lógica de "cambiar estado" debería estar en el *contexto* o el *estado* llamando a un método en el contexto.
        // Por simplicidad, el ejemplo de arriba (que usa `self.clone()` en la llamada)
        // muestra el concepto, pero no es la forma idiomática de Rust de pasar `self` mutable a un estado.
        // La verdadera implementación de State en Rust es más compleja debido a las reglas de propiedad y borrowing.
        println!("(Simulando delegación al estado actual)");
        self.estado_actual.borrow().encender(Rc::new(RefCell::new(Interruptor { estado_actual: Rc::clone(&self.estado_actual)})));
    }

    fn apagar(&self) {
        println!("(Simulando delegación al estado actual)");
        self.estado_actual.borrow().apagar(Rc::new(RefCell::new(Interruptor { estado_actual: Rc::clone(&self.estado_actual)})));
    }
}


// --- Ejemplo de uso con una estructura más sencilla para demostrar el concepto ---
// Sin la complejidad de Rc<RefCell> dentro del trait directamente para hacerlo más didáctico.
// Esta versión no permitirá al estado cambiar el estado del contexto de forma directa como en otros lenguajes.
// Pero ilustra la delegación del comportamiento.

trait EstadoSencillo {
    fn handle_request(&self, name: &str);
}

struct EstadoA;
impl EstadoSencillo for EstadoA {
    fn handle_request(&self, name: &str) {
        println!("{} está en Estado A. Hace algo específico de A.", name);
    }
}

struct EstadoB;
impl EstadoSencillo for EstadoB {
    fn handle_request(&self, name: &str) {
        println!("{} está en Estado B. Hace algo específico de B.", name);
    }
}

struct ContextoSencillo {
    nombre: String,
    estado_actual: Box<dyn EstadoSencillo>,
}

impl ContextoSencillo {
    fn new(name: &str) -> Self {
        ContextoSencillo {
            nombre: name.to_string(),
            estado_actual: Box::new(EstadoA), // Estado inicial
        }
    }

    fn set_estado(&mut self, nuevo_estado: Box<dyn EstadoSencillo>) {
        self.estado_actual = nuevo_estado;
        println!("Contexto {} ha cambiado al nuevo estado.", self.nombre);
    }

    fn request(&self) {
        self.estado_actual.handle_request(&self.nombre);
    }
}


fn main() {
    println!("--- Ejemplo Teórico con Contexto Sencillo ---");
    let mut mi_contexto = ContextoSencillo::new("MiObjeto");
    mi_contexto.request(); // Está en Estado A

    mi_contexto.set_estado(Box::new(EstadoB));
    mi_contexto.request(); // Ahora está en Estado B

    mi_contexto.set_estado(Box::new(EstadoA));
    mi_contexto.request(); // De vuelta al Estado A

    // --- Ejemplo con el Interruptor de Luz (conceptual, con desafíos de ownership en Rust) ---
    // Para que el patrón State sea plenamente funcional en Rust,
    // donde el estado interno del Contexto es mutado por los objetos de estado,
    // es necesario usar `Rc<RefCell<T>>` para permitir referencias mutables circulares
    // o `Arc<Mutex<T>>` para multihilo.

    println!("\n--- Ejemplo Conceptual del Interruptor de Luz (idiomático en Rust) ---");
    let interruptor_luz = Rc::new(RefCell::new(Interruptor::new()));

    // Necesitamos pasar el Rc<RefCell<Interruptor>> a los métodos de estado para que puedan mutarlo
    // Esto es un poco más complejo en Rust que en otros lenguajes que tienen GC o mutabilidad libre.
    // El método `encender` y `apagar` en `Interruptor` debería tomar `Rc<RefCell<Interruptor>>`
    // como parámetro para que el estado pueda llamar a `set_estado` en el `Interruptor`.

    // Simplificando para la demostración del concepto:
    println!("\nAcciones con el Interruptor:");
    
    // Primero, el interruptor está apagado por defecto
    println!("Estado inicial:");
    // El método 'encender' del Interruptor debe tomar un Rc<RefCell<Interruptor>>
    // para poder pasar self a los estados.
    // Aquí invocamos la lógica del estado directamente para mostrar el comportamiento.
    
    // Para hacer esto más idiomático y reflejar el patrón State en Rust:
    // Los métodos del *contexto* (`Interruptor`) llamarían a los métodos del estado.
    // Y los métodos del *estado* (EstadoEncendido, EstadoApagado) tendrían que recibir
    // una referencia mutable al `Interruptor` para poder cambiar su estado.

    // Reiniciamos el interruptor para la demostración real de las transiciones:
    let estado_apagado = Rc::new(EstadoApagado);
    let estado_encendido = Rc::new(EstadoEncendido);

    // El contexto delega la operación a su estado actual
    // Y el estado decide si cambia el estado del contexto.
    // Esto requiere que el contexto sea mutable y compartible.
    // La forma más clara es que el contexto se pase a sí mismo (como Rc<RefCell<Self>>)
    // a los métodos de estado.

    // Debido a las complejidades de ownership de Rust para un ejemplo de State
    // que es 1:1 con otros lenguajes (donde el estado muta el contexto),
    // el primer ejemplo `ContextoSencillo` es más directo para ilustrar la delegación.
    // El ejemplo del `Interruptor` se mantiene para la referencia al concepto pero
    // su implementación completa en Rust es más intrincada con `Rc<RefCell>`.

    let current_state = Rc::new(RefCell::new(EstadoApagado));
    let interruptor_rc = Rc::new(RefCell::new(
        InterruptorConTransicion {
            estado_actual: Rc::clone(&current_state),
        }
    ));

    // Define la lógica de transición dentro del Contexto para simplificar
    // y mantener el ownership claro, o que los estados reciban `Rc<RefCell<Context>>`
    // para mutarlo.
    // Aquí, simularemos las llamadas como si el Contexto manejara las transiciones.
    
    // Asumimos que los métodos `encender` y `apagar` del `Interruptor` ahora
    // manejan la lógica de transición directamente, basándose en la información del estado.
    // O que el estado tiene acceso al `Interruptor` para cambiarlo.
    
    // Para simplificar el ejemplo de la vida real de Rust:
    // El contexto tiene la lógica de transición.

    println!("Interruptor inicia apagado:");
    let mut interruptor_control = InterruptorRealControl.new();
    interruptor_control.presionar_boton(); // Encender
    interruptor_control.presionar_boton(); // Apagar
    interruptor_control.presionar_boton(); // Encender
    interruptor_control.presionar_boton(); // Apagar

    // Implementación más sencilla del Contexto para demostrar transiciones
    // Aquí el Contexto maneja las transiciones.
    struct InterruptorRealControl {
        estado_actual: String, // Simula el estado con una cadena
    }

    impl InterruptorRealControl {
        fn new() -> Self {
            InterruptorRealControl {
                estado_actual: "APAGADO".to_string(),
            }
        }

        fn presionar_boton(&mut self) {
            match self.estado_actual.as_str() {
                "APAGADO" => {
                    println!("Encendiendo la luz...");
                    self.estado_actual = "ENCENDIDO".to_string();
                },
                "ENCENDIDO" => {
                    println!("Apagando la luz...");
                    self.estado_actual = "APAGADO".to_string();
                },
                _ => println!("Estado desconocido."),
            }
            println!("Estado actual del interruptor: {}", self.estado_actual);
        }
    }
}
```

language&>es-ES<&