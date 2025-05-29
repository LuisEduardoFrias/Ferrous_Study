---
key: 54
name: prototype
addData: 28/05/2025
updateData: null
keywords:
 - creacional
 - clonación
 - copia de objetos
 - prototipo
 - prototipos
 - sin acoplamiento
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño Prototype (Prototipo)
Es un patrón creacional que te permite crear nuevos objetos clonando un objeto existente (el "prototipo"), en lugar de crear un objeto desde cero. Es útil cuando el costo de crear una nueva instancia de un objeto es alto o cuando quieres evitar un acoplamiento estrecho entre el creador y las clases concretas de los productos.

Imagina que tienes un juego con muchos tipos de monstruos, y cada monstruo tiene configuraciones complejas (atributos, habilidades, inventario). En lugar de crear un nuevo objeto MonstruoOrco cada vez que necesites uno, puedes tener un MonstruoOrco ya configurado como prototipo y simplemente clonarlo cuando lo necesites. Esto no solo puede ser más eficiente, sino que también simplifica el código al no tener que pasar todos los parámetros de configuración cada vez.

El patrón Prototype se basa en la idea de que los objetos pueden ser auto-clonables. En muchos lenguajes, esto implica implementar una interfaz o método de copia (como Clone en Rust).

```rust
&title>Ejemplo de Prototype: Clonando Figuras Geométricas<title&

// Definimos un trait para el prototipo (clonable)
trait FiguraGeometrica {
    fn clonar(&self) -> Box<dyn FiguraGeometrica>;
    fn dibujar(&self);
}

// Implementación concreta: Círculo
#[derive(Debug, Clone)] // Derive Clone para facilitar la clonación superficial
struct Circulo {
    radio: f64,
    color: String,
}

impl FiguraGeometrica for Circulo {
    fn clonar(&self) -> Box<dyn FiguraGeometrica> {
        Box::new(self.clone()) // Usa el trait Clone derivado
    }

    fn dibujar(&self) {
        println!("Dibujando un círculo con radio {} y color {}.", self.radio, self.color);
    }
}

// Implementación concreta: Rectángulo
#[derive(Debug, Clone)]
struct Rectangulo {
    ancho: f64,
    alto: f64,
    color: String,
}

impl FiguraGeometrica for Rectangulo {
    fn clonar(&self) -> Box<dyn FiguraGeometrica> {
        Box::new(self.clone())
    }

    fn dibujar(&self) {
        println!("Dibujando un rectángulo de {}x{} con color {}.", self.ancho, self.alto, self.color);
    }
}

fn main() {
    // Creamos los prototipos iniciales
    let circulo_prototipo = Circulo {
        radio: 10.0,
        color: "azul".to_string(),
    };
    let rectangulo_prototipo = Rectangulo {
        ancho: 20.0,
        alto: 15.0,
        color: "rojo".to_string(),
    };

    // Clonamos el círculo para crear nuevas instancias
    let mut circulo1 = circulo_prototipo.clonar();
    circulo1.dibujar();

    let mut circulo2 = circulo_prototipo.clonar();
    // Podemos modificar el clon sin afectar el prototipo
    if let Some(c) = circulo2.as_any_mut().downcast_mut::<Circulo>() {
        c.radio = 5.0;
        c.color = "verde".to_string();
    }
    circulo2.dibujar();

    // Clonamos el rectángulo
    let rectangulo1 = rectangulo_prototipo.clonar();
    rectangulo1.dibujar();

    // Podemos tener una "gestión" de prototipos si queremos
    let mut mapa_prototipos: std::collections::HashMap<String, Box<dyn FiguraGeometrica>> =
        std::collections::HashMap::new();
    mapa_prototipos.insert("circulo_base".to_string(), Box::new(circulo_prototipo));
    mapa_prototipos.insert("rectangulo_base".to_string(), Box::new(rectangulo_prototipo));

    let circulo_clonado_del_mapa = mapa_prototipos.get("circulo_base").unwrap().clonar();
    circulo_clonado_del_mapa.dibujar();
}

// Pequeña utilidad para downcasting en el ejemplo, no es parte esencial del patrón Prototype
use std::any::Any;

impl dyn FiguraGeometrica {
    fn as_any(&self) -> &dyn Any {
        self
    }

    fn as_any_mut(&mut self) -> &mut dyn Any {
        self
    }
}

```

language&>es-ES<&