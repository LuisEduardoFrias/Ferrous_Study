---
key: 56
name: adapter
addData: 28/05/2025
updateData: null
keywords: 
 - estructural
 - adaptador
 - interfaz
 - compatibilidad
 - envoltorio
 - bridge
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Adapter** (Adaptador)
Eun patrón **estructural** que permite que objetos con interfaces incompatibles colaboren. Actúa como un intermediario entre dos objetos, convirtiendo la interfaz de una clase en otra interfaz que el cliente espera. Es como un "enchufe" que permite conectar dispositivos que no son directamente compatibles.

Imagina que tienes una aplicación que espera interactuar con un servicio de pagos que sigue una interfaz específica (`ProcesadorDePagos`). Sin embargo, adquieres una nueva librería de pagos de terceros que tiene una interfaz diferente (`NuevoSistemaPago`). Directamente, no puedes usar `NuevoSistemaPago` con tu aplicación existente. Aquí es donde entra el Adaptador: creas una clase `AdaptadorNuevoSistemaPago` que implementa la interfaz `ProcesadorDePagos` y, dentro de ella, traduce las llamadas de tu aplicación a las llamadas que `NuevoSistemaPago` entiende.

El patrón Adapter es útil cuando quieres reutilizar clases existentes que no encajan en tu sistema debido a una interfaz diferente, sin tener que modificar el código fuente de esas clases existentes. Esto promueve el **principio de abierto/cerrado** y reduce el acoplamiento.

```rust
&title>Ejemplo de Adapter: Adaptando un Reproductor de MP3 a un Reproductor de Audio Genérico<title&
// La interfaz que nuestro cliente espera
trait ReproductorAudio {
    fn reproducir_audio(&self, nombre_archivo: &str);
}

// Una librería de terceros o un componente existente con una interfaz diferente
// Este es el "adaptee" (el que necesita ser adaptado)
struct ReproductorMp3Moderno;

impl ReproductorMp3Moderno {
    fn reproducir_cancion_mp3(&self, archivo: &str) {
        println!("Reproduciendo MP3: {} con un reproductor moderno.", archivo);
    }
    fn detener_reproduccion(&self) {
        println!("Deteniendo la reproducción de MP3.");
    }
}

// El Adaptador: implementa la interfaz esperada por el cliente
// y contiene una instancia del "adaptee"
struct AdaptadorReproductorMp3 {
    reproductor_mp3: ReproductorMp3Moderno,
}

impl AdaptadorReproductorMp3 {
    fn new(reproductor: ReproductorMp3Moderno) -> Self {
        AdaptadorReproductorMp3 {
            reproductor_mp3: reproductor,
        }
    }
}

// Implementamos la interfaz ReproductorAudio usando la funcionalidad del ReproductorMp3Moderno
impl ReproductorAudio for AdaptadorReproductorMp3 {
    fn reproducir_audio(&self, nombre_archivo: &str) {
        // Aquí es donde se realiza la adaptación/traducción
        if nombre_archivo.ends_with(".mp3") {
            self.reproductor_mp3.reproducir_cancion_mp3(nombre_archivo);
        } else {
            println!("Formato de archivo no soportado por este adaptador: {}", nombre_archivo);
        }
    }
}

// Función cliente que solo conoce la interfaz ReproductorAudio
fn iniciar_reproduccion(reproductor: &dyn ReproductorAudio, archivo: &str) {
    reproductor.reproducir_audio(archivo);
}

fn main() {
    // Tenemos un reproductor MP3 moderno
    let mp3_player = ReproductorMp3Moderno;

    // Pero nuestra función 'iniciar_reproduccion' espera un 'ReproductorAudio'
    // Creamos un adaptador para que sean compatibles
    let adaptador = AdaptadorReproductorMp3::new(mp3_player);

    println!("--- Cliente usando el Adaptador ---");
    iniciar_reproduccion(&adaptador, "mi_cancion_favorita.mp3");
    iniciar_reproduccion(&adaptador, "otro_audio.wav"); // Este no será reproducido por el adaptador de MP3
    println!("---------------------------------");

    // Podemos demostrar que el ReproductorMp3Moderno no es compatible directamente
    // con 'iniciar_reproduccion'
    // iniciar_reproduccion(&mp3_player, "archivo.mp3"); // Esto causaría un error de tipo
}
```