---
key: 62
name: proxy
addData: 28/05/2025
updateData: null
keywords:
 - estructural
 - proxy
 - sustituto
 - intermediario
 - control de acceso
 - lazy loading
 - protección
 - caché
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño Proxy (Apoderado o Sustituto)
Es un patrón estructural que proporciona un sustituto o un marcador de posición para otro objeto. Un proxy controla el acceso al objeto original, permitiendo añadir funcionalidades antes o después de la solicitud al objeto real. Esto puede ser útil para control de acceso, caché, inicialización lenta (lazy loading), registro, o conteo de referencias.

Imagina que tienes una clase `ImagenGrande` que es muy costosa de cargar (por ejemplo, una imagen de alta resolución que viene de la red). Si tu aplicación necesita mostrar muchas de estas imágenes, pero solo carga algunas de ellas, sería ineficiente cargar todas al inicio.

Un Proxy para `ImagenGrande` (`ProxyImagenGrande`) podría tener la misma interfaz que `ImagenGrande` pero solo cargaría la imagen real cuando su método `mostrar()` sea realmente llamado por primera vez.

 - title&>Existen varios tipos de proxies:
 - Proxy Remoto: Representa un objeto ubicado en un espacio de direcciones diferente (por ejemplo, en un servidor).
 - Proxy Virtual: Crea objetos costosos bajo demanda (lazy loading).
 - Proxy de Protección: Controla el acceso al objeto original según los permisos del cliente.
 - Proxy de Caché: Almacena temporalmente los resultados de operaciones costosas.

```rust
&title>Ejemplo de Proxy: Carga Virtual de Imágenes<title&
use std::sync::{Once, Mutex};
use std::cell::RefCell; // Para mutabilidad interna en métodos inmutables (&self)
use std::rc::Rc; // Para compartir ownership en un solo hilo

// Interfaz común para la imagen real y el proxy
trait Imagen {
    fn mostrar(&self);
}

// Objeto real: Una imagen que es costosa de cargar
struct ImagenReal {
    nombre_archivo: String,
}

impl ImagenReal {
    fn new(nombre_archivo: &str) -> Self {
        println!("Cargando imagen real: {}...", nombre_archivo);
        // Simular una operación de carga costosa
        std::thread::sleep(std::time::Duration::from_secs(2));
        println!("Carga de {} completada.", nombre_archivo);
        ImagenReal {
            nombre_archivo: nombre_archivo.to_string(),
        }
    }
}

impl Imagen for ImagenReal {
    fn mostrar(&self) {
        println!("Mostrando imagen: {}.", self.nombre_archivo);
    }
}

// Proxy: Controla el acceso y realiza carga perezosa
// Usamos Rc<RefCell<Option<ImagenReal>>> para permitir la mutabilidad interna
// y compartir la referencia al objeto real de forma segura en un solo hilo.
// Para un entorno multihilo, usaríamos Arc<Mutex<Option<ImagenReal>>>.
struct ProxyImagen {
    nombre_archivo: String,
    // Rc para compartir el "ownership" del RefCell, y RefCell para mutabilidad interna
    // Option porque la imagen real se carga perezosamente
    imagen_real: Rc<RefCell<Option<ImagenReal>>>, 
}

impl ProxyImagen {
    fn new(nombre_archivo: &str) -> Self {
        println!("Proxy creado para: {}.", nombre_archivo);
        ProxyImagen {
            nombre_archivo: nombre_archivo.to_string(),
            imagen_real: Rc::new(RefCell::new(None)), // Inicialmente la imagen real no está cargada
        }
    }
}

impl Imagen for ProxyImagen {
    fn mostrar(&self) {
        // Accedemos al RefCell y obtenemos una referencia mutable a su contenido.
        // Esto es seguro porque RefCell aplica las reglas de borrowing en tiempo de ejecución.
        let mut real_image_borrow = self.imagen_real.borrow_mut();

        // Carga la imagen real solo si no ha sido cargada aún
        if real_image_borrow.is_none() {
            println!("(Proxy: La imagen real NO está cargada, procediendo a cargarla...)");
            *real_image_borrow = Some(ImagenReal::new(&self.nombre_archivo));
            println!("(Proxy: Imagen real cargada por primera vez.)");
        } else {
            println!("(Proxy: La imagen real ya está cargada, reutilizando.)");
        }
        
        // Delega la llamada al objeto real (que ahora está garantizado que existe)
        real_image_borrow.as_ref().unwrap().mostrar();
    }
}

fn main() {
    // El cliente solo interactúa con el proxy
    let imagen1 = ProxyImagen::new("vacaciones.jpg");
    let imagen2 = ProxyImagen::new("paisaje.png");
    let imagen3 = ProxyImagen::new("retrato.jpeg");

    println!("\n--- La aplicación usa la imagen (solo se carga cuando se pide) ---");
    imagen1.mostrar(); // La imagen real de "vacaciones.jpg" se carga aquí

    println!("\n--- La aplicación usa la segunda imagen ---");
    imagen2.mostrar(); // La imagen real de "paisaje.png" se carga aquí

    println!("\n--- Usando la primera imagen de nuevo (ya está cargada) ---");
    imagen1.mostrar(); // No se recarga, solo se muestra (mensaje de "ya cargada")

    println!("\n--- La aplicación usa la tercera imagen ---");
    imagen3.mostrar(); // La imagen real de "retrato.jpeg" se carga aquí
}
```

language&>es-ES<&