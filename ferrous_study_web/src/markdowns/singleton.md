---
key: 55
name: singleton
addData: 28/05/2025
updateData: null
keywords:
 - creacional
 - instancia única
 - global
 - acceso global
 - concurrencia
 - Lazy initialization
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño Singleton (Instancia Única)

Es un patrón creacional que garantiza que una clase tenga solo una instancia y proporciona un punto de acceso global a ella. 
Es útil cuando necesitas que un único objeto coordine acciones en todo el sistema, como un gestor de configuración, un pool de conexiones a bases de datos, o un logger.

Imagina que tienes una aplicación y solo quieres una configuración global que todas las partes de la aplicación puedan leer. Crear varias instancias de esta configuración sería ineficiente y podría llevar a inconsistencias. El patrón Singleton asegura que, sin importar cuántas veces intentes "crear" la configuración, siempre obtendrás la misma instancia.

Es importante usar el Singleton con cautela, ya que introduce un estado global que puede dificultar las pruebas unitarias y aumentar el acoplamiento en tu aplicación. En Rust, la implementación de un Singleton a menudo implica el uso de características de concurrencia y seguridad de hilos, ya que la inicialización y el acceso deben ser seguros en entornos multihilo.

```rust
&title>Ejemplo de Singleton: Gestor de Configuración Global<title&

use std::sync::{Once, Mutex}; // Para garantizar una única inicialización y acceso seguro

// La estructura de configuración que queremos que sea Singleton
#[derive(Debug)]
struct Configuracion {
    api_key: String,
    debug_mode: bool,
}

// Paso 1: Usar `static` y `Once` para la inicialización lazy y segura
static mut INSTANCE: Option<Mutex<Configuracion>> = None;
static ONCE: Once = Once::new();

impl Configuracion {
    // El método privado para crear una nueva instancia (solo para uso interno del Singleton)
    fn new_internal() -> Self {
        println!("Inicializando el Gestor de Configuración...");
        Configuracion {
            api_key: "mi_api_key_secreta_123".to_string(),
            debug_mode: true,
        }
    }

    // El método público para obtener la instancia única
    // Retorna un `MutexGuard` que te permite acceder a la configuración de forma segura.
    fn get_instance() -> &'static Mutex<Configuracion> {
        ONCE.call_once(|| {
            // Este bloque solo se ejecutará la primera vez
            unsafe {
                // Se usa `unsafe` porque estamos manipulando una variable estática mutable
                // Sin embargo, `Once` garantiza que esto solo ocurre una vez y es seguro.
                INSTANCE = Some(Mutex::new(Configuracion::new_internal()));
            }
        });
        unsafe {
            // Después de `call_once`, `INSTANCE` estará inicializado
            INSTANCE.as_ref().unwrap()
        }
    }

    // Métodos de ejemplo para interactuar con la configuración
    fn get_api_key(&self) -> &str {
        &self.api_key
    }

    fn is_debug_mode(&self) -> bool {
        self.debug_mode
    }

    fn set_debug_mode(&mut self, mode: bool) {
        self.debug_mode = mode;
        println!("Modo debug cambiado a: {}", mode);
    }
}

fn main() {
    println!("--- Intentando obtener la instancia por primera vez ---");
    let config1 = Configuracion::get_instance();
    let mut config_guard1 = config1.lock().unwrap(); // Bloqueamos el Mutex para acceder
    println!("API Key (1): {}", config_guard1.get_api_key());
    config_guard1.set_debug_mode(false);
    drop(config_guard1); // Liberamos el Mutex

    println!("\n--- Intentando obtener la instancia por segunda vez ---");
    let config2 = Configuracion::get_instance();
    let config_guard2 = config2.lock().unwrap(); // Volvemos a bloquear
    println!("API Key (2): {}", config_guard2.get_api_key());
    println!("Modo Debug (2): {}", config_guard2.is_debug_mode());
    drop(config_guard2);

    println!("\n--- Intentando obtener la instancia por tercera vez (desde otra \"parte\" de la aplicación) ---");
    // Simulamos otro módulo o función que accede a la configuración
    otro_modulo_accede_config();
}

fn otro_modulo_accede_config() {
    let config_tercero = Configuracion::get_instance();
    let config_guard_tercero = config_tercero.lock().unwrap();
    println!("Modo Debug (Otro Módulo): {}", config_guard_tercero.is_debug_mode());
}
```

language&>es-ES<&