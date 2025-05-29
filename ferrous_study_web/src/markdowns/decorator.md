---
key: 59
name: decorator
addData: 28/05/2025
updateData: null
keywords:
 - estructural
 - decorador
 - envoltorio
 - comportamiento
 - extensión
 - dinámico
 - envoltura
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño Decorator (Decorador)
Es un patrón estructural que te permite añadir nuevas funcionalidades a un objeto existente de forma dinámica y transparente, sin alterar su estructura. Lo hace "envolviendo" el objeto original en un objeto decorador que tiene la misma interfaz, pero que añade comportamientos adicionales antes o después de delegar la llamada al objeto original.

Imagina que tienes una interfaz de un "Café" y quieres añadirle ingredientes extra como leche, azúcar o chocolate. En lugar de crear subclases para cada combinación posible (CafeConLeche, CafeConAzucar, CafeConChocolateYLeche, etc. lo que llevaría a una explosión de clases), puedes usar el patrón Decorator. Tendrías un DecoradorDeLeche, un DecoradorDeAzucar, etc., y cada uno de ellos envuelve un objeto Café (o un Café ya decorado) y añade su propio comportamiento (por ejemplo, añadir un costo extra al precio y una descripción a la bebida).

El Decorator es una alternativa flexible a la herencia para extender la funcionalidad de un objeto. Promueve el principio de abierto/cerrado al permitir añadir nuevas funcionalidades sin modificar las clases existentes.

```rust
&title>Ejemplo de Decorator: Preparando un Café con Ingredientes<title&

// Componente: La interfaz común para el objeto base y los decoradores
trait Cafe {
    fn get_costo(&self) -> f64;
    fn get_descripcion(&self) -> String;
}

// Implementación concreta del componente base
struct CafeSimple;
impl Cafe for CafeSimple {
    fn get_costo(&self) -> f64 {
        2.0
    }
    fn get_descripcion(&self) -> String {
        "Café simple".to_string()
    }
}

// Decorador base (opcional, pero útil para evitar duplicación de código)
struct CafeDecorator {
    cafe: Box<dyn Cafe>,
}

impl CafeDecorator {
    fn new(cafe: Box<dyn Cafe>) -> Self {
        CafeDecorator { cafe }
    }
}

// Decorador concreto: Leche
struct LecheDecorator {
    decorador: CafeDecorator,
}

impl LecheDecorator {
    fn new(cafe: Box<dyn Cafe>) -> Self {
        LecheDecorator {
            decorador: CafeDecorator::new(cafe),
        }
    }
}

impl Cafe for LecheDecorator {
    fn get_costo(&self) -> f64 {
        self.decorador.cafe.get_costo() + 0.5 // Añade costo de la leche
    }
    fn get_descripcion(&self) -> String {
        format!("{}, con leche", self.decorador.cafe.get_descripcion()) // Añade descripción de la leche
    }
}

// Decorador concreto: Azúcar
struct AzucarDecorator {
    decorador: CafeDecorator,
}

impl AzucarDecorator {
    fn new(cafe: Box<dyn Cafe>) -> Self {
        AzucarDecorator {
            decorador: CafeDecorator::new(cafe),
        }
    }
}

impl Cafe for AzucarDecorator {
    fn get_costo(&self) -> f64 {
        self.decorador.cafe.get_costo() + 0.2 // Añade costo del azúcar
    }
    fn get_descripcion(&self) -> String {
        format!("{}, con azúcar", self.decorador.cafe.get_descripcion()) // Añade descripción del azúcar
    }
}

// Decorador concreto: Chocolate
struct ChocolateDecorator {
    decorador: CafeDecorator,
}

impl ChocolateDecorator {
    fn new(cafe: Box<dyn Cafe>) -> Self {
        ChocolateDecorator {
            decorador: CafeDecorator::new(cafe),
        }
    }
}

impl Cafe for ChocolateDecorator {
    fn get_costo(&self) -> f64 {
        self.decorador.cafe.get_costo() + 1.0 // Añade costo del chocolate
    }
    fn get_descripcion(&self) -> String {
        format!("{}, con chocolate", self.decorador.cafe.get_descripcion()) // Añade descripción del chocolate
    }
}


fn main() {
    // Un café simple
    let cafe_base: Box<dyn Cafe> = Box::new(CafeSimple);
    println!("{} - Costo: ${}", cafe_base.get_descripcion(), cafe_base.get_costo());

    // Café con leche
    let cafe_con_leche: Box<dyn Cafe> = Box::new(LecheDecorator::new(Box::new(CafeSimple)));
    println!("{} - Costo: ${}", cafe_con_leche.get_descripcion(), cafe_con_leche.get_costo());

    // Café con leche y azúcar
    let cafe_con_leche_y_azucar: Box<dyn Cafe> = Box::new(AzucarDecorator::new(
        Box::new(LecheDecorator::new(Box::new(CafeSimple)))
    ));
    println!("{} - Costo: ${}", cafe_con_leche_y_azucar.get_descripcion(), cafe_con_leche_y_azucar.get_costo());

    // Café con chocolate, leche y azúcar (¡el orden importa en la descripción!)
    let cafe_completo: Box<dyn Cafe> = Box::new(ChocolateDecorator::new(
        Box::new(LecheDecorator::new(
            Box::new(AzucarDecorator::new(Box::new(CafeSimple)))
        ))
    ));
    println!("{} - Costo: ${}", cafe_completo.get_descripcion(), cafe_completo.get_costo());

    // Otro ejemplo: un café simple con chocolate
    let cafe_con_chocolate: Box<dyn Cafe> = Box::new(ChocolateDecorator::new(Box::new(CafeSimple)));
    println!("{} - Costo: ${}", cafe_con_chocolate.get_descripcion(), cafe_con_chocolate.get_costo());
}
```

language&>es-ES<&
