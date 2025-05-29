---
key: 51
name: factory_method
addData: 28/05/2025
updateData: null
keywords: 
 - creacional
 - factory
 - método de fábrica
 - object creation
 - polimorfismo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Factory Method** (Método de Fábrica)
Es un patrón de diseño **creacional** que proporciona una interfaz para crear objetos en una superclase, pero permite que las subclases alteren el tipo de objetos que se crearán. En esencia, delega la instanciación de objetos a las subclases.

Imagina que tienes una aplicación que necesita manejar diferentes tipos de "productos" (por ejemplo, coches, motocicletas, bicicletas), pero no quieres que el código que usa estos productos sepa exactamente cómo se crean. El Factory Method resuelve esto al definir un método abstracto en la clase base (o un trait en Rust) para la creación de un producto. Las subclases luego implementan este método para devolver instancias de sus productos específicos.

Esto promueve el **principio de abierto/cerrado**, lo que significa que puedes añadir nuevos tipos de productos sin modificar el código existente que los usa, lo que hace que tu sistema sea más flexible y fácil de mantener.

```rust
&title>Ejemplo de Factory Method: Fábrica de Vehículos<title&

// Definimos un trait para los productos (Vehículos)
trait Vehiculo {
    fn conducir(&self);
}

// Implementaciones concretas de Vehículos
struct Coche;
impl Vehiculo for Coche {
    fn conducir(&self) {
        println!("Conduciendo un coche.");
    }
}

struct Motocicleta;
impl Vehiculo for Motocicleta {
    fn conducir(&self) {
        println!("Conduciendo una motocicleta.");
    }
}

// Definimos un trait para la fábrica (Creador)
trait FabricaVehiculos {
    fn crear_vehiculo(&self) -> Box<dyn Vehiculo>;
}

// Implementaciones concretas de fábricas
struct FabricaCoches;
impl FabricaVehiculos for FabricaCoches {
    fn crear_vehiculo(&self) -> Box<dyn Vehiculo> {
        Box::new(Coche)
    }
}

struct FabricaMotocicletas;
impl FabricaVehiculos for FabricaMotocicletas {
    fn crear_vehiculo(&self) -> Box<dyn Vehiculo> {
        Box::new(Motocicleta)
    }
}

// Función cliente que usa la fábrica sin conocer los detalles de creación
fn cliente_usa_vehiculo(fabrica: &dyn FabricaVehiculos) {
    let vehiculo = fabrica.crear_vehiculo();
    vehiculo.conducir();
}

fn main() {
    println!("--- Usando la Fábrica de Coches ---");
    let fabrica_coches = FabricaCoches;
    cliente_usa_vehiculo(&fabrica_coches);

    println!("\n--- Usando la Fábrica de Motocicletas ---");
    let fabrica_motocicletas = FabricaMotocicletas;
    cliente_usa_vehiculo(&fabrica_motocicletas);

    // Si queremos añadir un nuevo tipo de vehículo (por ejemplo, Bicicleta),
    // solo necesitamos crear su struct, implementar Vehiculo y una nueva fábrica.
    // No necesitamos modificar el código de cliente_usa_vehiculo.
}
```

language&>es-ES<&