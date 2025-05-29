---
key: 52
name: abstract_factory
addData: 28/05/2025
updateData: null
keywords: 
 - creacional
 - fábrica
 - familia de objetos
 - interfaces
 - acoplamiento bajo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Abstract Factory** (Fábrica Abstracta)
Es un patrón **creacional** que proporciona una interfaz para crear **familias de objetos relacionados o dependientes** sin especificar sus clases concretas. A diferencia del Factory Method, que crea un solo tipo de producto, el Abstract Factory se enfoca en producir conjuntos completos de productos que pertenecen a una familia específica.

Imagina que estás desarrollando un sistema de UI que necesita soportar diferentes "temas" (por ejemplo, Claro y Oscuro), y cada tema tiene varios componentes (botones, casillas de verificación, etc.) que deben coincidir con ese tema. El Abstract Factory te permite crear una "fábrica" para cada tema que, a su vez, produce todos los componentes de ese tema de manera coherente. El código cliente interactúa solo con las interfaces abstractas de la fábrica y de los productos, desacoplando la creación de objetos de su uso.

Esto es especialmente útil cuando tu sistema debe ser independiente de cómo se crean, componen y representan sus productos.

```rust
&title>Ejemplo de Abstract Factory: Fábrica de Elementos UI<title&

// --- Productos Abstractos ---
// Interfaz para un Botón
trait Boton {
    fn click(&self);
}

// Interfaz para una Casilla de Verificación
trait Checkbox {
    fn marcar(&self);
}

// --- Implementaciones Concretas de Productos para Tema Claro ---
struct BotonClaro;
impl Boton for BotonClaro {
    fn click(&self) {
        println!("Botón claro ha sido clickeado.");
    }
}

struct CheckboxClaro;
impl Checkbox for CheckboxClaro {
    fn marcar(&self) {
        println!("Casilla de verificación clara ha sido marcada.");
    }
}

// --- Implementaciones Concretas de Productos para Tema Oscuro ---
struct BotonOscuro;
impl Boton for BotonOscuro {
    fn click(&self) {
        println!("Botón oscuro ha sido clickeado.");
    }
}

struct CheckboxOscuro;
impl Checkbox for CheckboxOscuro {
    fn marcar(&self) {
        println!("Casilla de verificación oscura ha sido marcada.");
    }
}

// --- Fábrica Abstracta ---
// Interfaz para crear familias de elementos UI
trait FabricaUI {
    fn crear_boton(&self) -> Box<dyn Boton>;
    fn crear_checkbox(&self) -> Box<dyn Checkbox>;
}

// --- Implementaciones Concretas de Fábricas ---
struct FabricaUIClaro;
impl FabricaUI for FabricaUIClaro {
    fn crear_boton(&self) -> Box<dyn Boton> {
        Box::new(BotonClaro)
    }

    fn crear_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(CheckboxClaro)
    }
}

struct FabricaUIOscuro;
impl FabricaUI for FabricaUIOscuro {
    fn crear_boton(&self) -> Box<dyn Boton> {
        Box::new(BotonOscuro)
    }

    fn crear_checkbox(&self) -> Box<dyn Checkbox> {
        Box::new(CheckboxOscuro)
    }
}

// --- Código Cliente ---
// El cliente interactúa con la fábrica abstracta para crear productos.
// No necesita conocer las clases concretas de los productos o las fábricas.
fn renderizar_ui(fabrica: &dyn FabricaUI) {
    let boton = fabrica.crear_boton();
    let checkbox = fabrica.crear_checkbox();

    boton.click();
    checkbox.marcar();
}

fn main() {
    println!("--- Renderizando UI con Tema Claro ---");
    let fabrica_claro = FabricaUIClaro;
    renderizar_ui(&fabrica_claro);

    println!("\n--- Renderizando UI con Tema Oscuro ---");
    let fabrica_oscuro = FabricaUIOscuro;
    renderizar_ui(&fabrica_oscuro);
}
language&>es-ES<&