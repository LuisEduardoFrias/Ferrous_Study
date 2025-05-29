---
key: 69
name: observer
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - observador
 - publicador
 - suscriptor
 - notificaciones
 - eventos
 - acoplamiento bajo
 - reactivo
 - broadcasting
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Observer** (Observador)
Es un patrón **de comportamiento** que define una dependencia de uno-a-muchos entre objetos, de manera que cuando un objeto cambia de estado, todos sus dependientes son notificados y actualizados automáticamente. El objeto que tiene el estado que se observa se llama **Sujeto** (o Publicador), y los objetos que dependen de él se llaman **Observadores** (o Suscriptores).

Imagina que estás construyendo una aplicación de bolsa donde varios gráficos y tablas necesitan mostrar el precio de una acción en tiempo real. En lugar de que cada gráfico pregunte constantemente el precio a la acción, la acción se convierte en un **Sujeto**. Cuando el precio de la acción cambia, notifica a todos los gráficos (sus **Observadores**), y estos se actualizan. Los gráficos no necesitan saber cómo la acción obtiene su precio, ni la acción necesita saber cómo los gráficos se actualizan.

Este patrón es fundamental para la programación **dirigida por eventos** y es clave para construir sistemas con **bajo acoplamiento**, ya que el Sujeto y los Observadores interactúan a través de una interfaz común de notificación sin conocer los detalles específicos de implementación del otro.

```rust
&title>Ejemplo de Observer: Notificaciones de Cambio de Precio de un Producto<title&

use std::sync::{Arc, Mutex};
use std::cell::RefCell;

// Sujeto (Publicador): Objeto que tiene el estado a observar y notifica a los observadores
struct Producto {
    nombre: String,
    precio: f64,
    // Usamos Vec<Arc<Mutex<dyn Observador>>> para manejar múltiples observadores
    // de forma segura en un contexto de concurrencia y con mutabilidad compartida.
    // Arc para ownership compartido, Mutex para mutabilidad segura en hilos.
    observadores: Vec<Arc<Mutex<dyn Observador>>>,
}

impl Producto {
    fn new(nombre: &str, precio: f64) -> Self {
        Producto {
            nombre: nombre.to_string(),
            precio,
            observadores: Vec::new(),
        }
    }

    // Método para adjuntar (suscribir) un observador
    fn adjuntar(&mut self, observador: Arc<Mutex<dyn Observador>>) {
        self.observadores.push(observador);
        println!("Observador adjuntado al producto '{}'.", self.nombre);
    }

    // Método para desadjuntar (desuscribir) un observador
    // Nota: Desadjuntar por referencia de objeto es más complejo en Rust.
    // Aquí, para simplificar, se omitirá o se haría por índice/nombre.
    // fn desadjuntar(&mut self, observador: &Arc<Mutex<dyn Observador>>) { ... }

    // Método para cambiar el precio y notificar a los observadores
    fn set_precio(&mut self, nuevo_precio: f64) {
        if self.precio != nuevo_precio {
            println!("\n--- Cambiando precio de '{}' de ${} a ${} ---", self.nombre, self.precio, nuevo_precio);
            self.precio = nuevo_precio;
            self.notificar_observadores();
        } else {
            println!("El precio de '{}' no ha cambiado (sigue siendo ${}).", self.nombre, self.precio);
        }
    }

    // Método para notificar a todos los observadores
    fn notificar_observadores(&self) {
        println!("Notificando a los observadores de '{}'...", self.nombre);
        for observador in &self.observadores {
            // Bloqueamos el mutex para acceder y llamar a `actualizar`
            if let Ok(mut obs) = observador.lock() {
                obs.actualizar(&self.nombre, self.precio);
            }
        }
    }
}

// Observador: La interfaz que los objetos dependientes deben implementar
trait Observador: Send + Sync { // Send + Sync para permitir el uso con Mutex en threads
    fn actualizar(&mut self, nombre_producto: &str, nuevo_precio: f64);
}

// Observador Concreto: Display de Precio
struct DisplayPrecio {
    id: u32,
}

impl DisplayPrecio {
    fn new(id: u32) -> Self {
        DisplayPrecio { id }
    }
}

impl Observador for DisplayPrecio {
    fn actualizar(&mut self, nombre_producto: &str, nuevo_precio: f64) {
        println!("Display Precio {}: El precio de '{}' ha cambiado a ${}.", self.id, nombre_producto, nuevo_precio);
    }
}

// Observador Concreto: Alerta de Stock
struct AlertaStock {
    umbral: f64,
}

impl AlertaStock {
    fn new(umbral: f64) -> Self {
        AlertaStock { umbral }
    }
}

impl Observador for AlertaStock {
    fn actualizar(&mut self, nombre_producto: &str, nuevo_precio: f64) {
        if nuevo_precio < self.umbral {
            println!("Alerta Stock: ¡El precio de '{}' ha caído por debajo del umbral (${})! Nuevo precio: ${}.", nombre_producto, self.umbral, nuevo_precio);
        }
    }
}


fn main() {
    // Crear el sujeto (Producto)
    let mut telefono = Producto::new("Smartphone X", 800.0);

    // Crear observadores
    let display1 = Arc::new(Mutex::new(DisplayPrecio::new(1)));
    let display2 = Arc::new(Mutex::new(DisplayPrecio::new(2)));
    let alerta_oferta = Arc::new(Mutex::new(AlertaStock::new(700.0)));

    // Adjuntar observadores al sujeto
    telefono.adjuntar(display1);
    telefono.adjuntar(display2);
    telefono.adjuntar(alerta_oferta);

    // Cambiar el precio del producto y ver cómo se notifican los observadores
    telefono.set_precio(750.0);
    telefono.set_precio(750.0); // No debería notificar si el precio no cambia
    telefono.set_precio(690.0); // Este cambio debería activar la alerta de oferta

    // Puedes añadir y quitar observadores dinámicamente si la implementación lo permite.
    // Aquí, por simplicidad, no hemos implementado `desadjuntar` detalladamente.
}
```
language&>es-ES<&