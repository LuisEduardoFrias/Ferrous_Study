---
key: 45
name: solucion_eventos_ascensor
addData: 26/05/2025
updateData: null
keywords: 
 - solución
 - eventos de ascensor
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución

```rust
#[derive(Debug)]
/// Un evento en el sistema de ascensores al que debe reaccionar el controlador.
enum Event {
    /// Se ha pulsado un botón.
    ButtonPressed(Button),

    /// El ascensor ha llegado a la planta indicada.
    CarArrived(Floor),

    /// Las puertas del ascensor se han abierto.
    CarDoorOpened,

    /// Las puertas del ascensor se han cerrado.
    CarDoorClosed,
}

/// Una planta se representa como un número entero.
type Floor = i32;

/// Un sentido de la marcha.
#[derive(Debug)]
enum Direction {
    Up,
    Down,
}

/// Un botón accesible para el usuario.
#[derive(Debug)]
enum Button {
    /// Un botón para el ascensor en la planta indicada.
    LobbyCall(Direction, Floor),

    /// Un botón de planta de la cabina del ascensor.
    CarFloor(Floor),
}

/// El ascensor ha llegado a la planta indicada.
fn car_arrived(floor: i32) -> Event {
    Event::CarArrived(floor)
}

/// Las puertas del ascensor se han abierto.
fn car_door_opened() -> Event {
    Event::CarDoorOpened
}

/// Las puertas del ascensor se han cerrado.
fn car_door_closed() -> Event {
    Event::CarDoorClosed
}

/// Se ha pulsado el botón direccional de un ascensor en la planta indicada.
fn lobby_call_button_pressed(floor: i32, dir: Direction) -> Event {
    Event::ButtonPressed(Button::LobbyCall(dir, floor))
}

/// Se ha pulsado el botón de una planta en el ascensor.
fn car_floor_button_pressed(floor: i32) -> Event {
    Event::ButtonPressed(Button::CarFloor(floor))
}

fn main() {
    println!(
        "Un pasajero de la planta baja ha pulsado el botón para ir hacia arriba: {:?}",
        lobby_call_button_pressed(0, Direction::Up)
    );
    println!("El ascensor ha llegado a la planta baja: {:?}", car_arrived(0));
    println!("Las puertas del ascensor se han abierto: {:?}", car_door_opened());
    println!(
        "Un pasajero ha pulsado el botón de la tercera planta: {:?}",
        car_floor_button_pressed(3)
    );
    println!("Las puertas del ascensor se han cerrado: {:?}", car_door_closed());
    println!("El ascensor ha llegado a la tercera planta: {:?}", car_arrived(3));
}
```

language&>es-ES<&