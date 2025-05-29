---
key: 60
name: facade
addData: 28/05/2025
updateData: null
keywords:
 - estructural
 - fachada
 - simplificación
 - interfaz
 - subsistema
 - acoplamiento bajo
 - simplificar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño Facade (Fachada)
Es un patrón estructural que proporciona una interfaz unificada y simplificada a un conjunto de interfaces en un subsistema. Define una interfaz de alto nivel que hace que el subsistema sea más fácil de usar.

Imagina que tienes un sistema de cine en casa muy complejo con muchos componentes (proyector, reproductor de DVD/Blu-ray, sistema de sonido, luces, etc.). Para ver una película, tendrías que encender el proyector, encender el reproductor, seleccionar la entrada, bajar las luces, subir el volumen del sonido, etc. Una Fachada sería una clase CineEnCasa con un método simple como ver_pelicula(pelicula) que internamente orquesta todas esas operaciones complejas en los subsistemas individuales.

El patrón Facade es útil cuando un subsistema es complejo o tiene un gran número de clases interdependientes. Su objetivo principal es simplificar la interacción con un subsistema, reduciendo el acoplamiento entre el cliente y las clases internas del subsistema. No encapsula la complejidad, sino que proporciona una vista simplificada. Las clases del subsistema aún pueden ser usadas directamente si se necesita la funcionalidad completa.

```rust
&title>Ejemplo de Facade: Sistema de Cine en Casa<title&

// Subsistema 1: Proyector
struct Proyector;
impl Proyector {
    fn encender(&self) {
        println!("Proyector: Encendido.");
    }
    fn apagar(&self) {
        println!("Proyector: Apagado.");
    }
    fn fijar_entrada(&self, entrada: &str) {
        println!("Proyector: Entrada fijada a {}.", entrada);
    }
}

// Subsistema 2: Reproductor de Blu-ray
struct BluRayPlayer;
impl BluRayPlayer {
    fn encender(&self) {
        println!("Blu-ray Player: Encendido.");
    }
    fn apagar(&self) {
        println!("Blu-ray Player: Apagado.");
    }
    fn reproducir_pelicula(&self, pelicula: &str) {
        println!("Blu-ray Player: Reproduciendo \"{}\".", pelicula);
    }
    fn pausar(&self) {
        println!("Blu-ray Player: Pausado.");
    }
}

// Subsistema 3: Sistema de Sonido
struct SistemaSonido;
impl SistemaSonido {
    fn encender(&self) {
        println!("Sistema de Sonido: Encendido.");
    }
    fn apagar(&self) {
        println!("Sistema de Sonido: Apagado.");
    }
    fn fijar_volumen(&self, volumen: u8) {
        println!("Sistema de Sonido: Volumen fijado a {}.", volumen);
    }
}

// Subsistema 4: Luces
struct Luces;
impl Luces {
    fn atenuar(&self, nivel: u8) {
        println!("Luces: Atenuadas al {}%.", nivel);
    }
    fn encender_total(&self) {
        println!("Luces: Encendidas al 100%.");
    }
}

// La Fachada del Cine en Casa
struct CineEnCasaFacade {
    proyector: Proyector,
    blu_ray_player: BluRayPlayer,
    sistema_sonido: SistemaSonido,
    luces: Luces,
}

impl CineEnCasaFacade {
    fn new() -> Self {
        CineEnCasaFacade {
            proyector: Proyector,
            blu_ray_player: BluRayPlayer,
            sistema_sonido: SistemaSonido,
            luces: Luces,
        }
    }

    fn ver_pelicula(&self, pelicula: &str) {
        println!("\n--- Preparando para ver la película \"{}\" ---", pelicula);
        self.luces.atenuar(10);
        self.proyector.encender();
        self.proyector.fijar_entrada("Blu-ray");
        self.blu_ray_player.encender();
        self.sistema_sonido.encender();
        self.sistema_sonido.fijar_volumen(50);
        self.blu_ray_player.reproducir_pelicula(pelicula);
        println!("--- ¡Disfruta la película! ---");
    }

    fn fin_pelicula(&self) {
        println!("\n--- Apagando el sistema de Cine en Casa ---");
        self.blu_ray_player.pausar(); // O detener, dependiendo de la lógica
        self.blu_ray_player.apagar();
        self.proyector.apagar();
        self.sistema_sonido.apagar();
        self.luces.encender_total();
        println!("--- Sistema apagado ---");
    }
}

fn main() {
    let cine_en_casa = CineEnCasaFacade::new();

    cine_en_casa.ver_pelicula("Interstellar");
    // ... la película está en marcha ...
    cine_en_casa.fin_pelicula();

    println!("\n--- El cliente puede seguir interactuando con los subsistemas directamente si lo necesita ---");
    let mi_proyector_directo = Proyector;
    mi_proyector_directo.encender();
    mi_proyector_directo.apagar();
}
```
language&>es-ES<&