---
key: 61
name: flyweight
addData: 28/05/2025
updateData: null
keywords: 
 - estructural
 - peso ligero
 - optimización
 - memoria
 - objetos compartidos
 - intrínseco
 - extrínseco
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Flyweight** (Peso Ligero)
Es un patrón **estructural** que tiene como objetivo **minimizar el uso de memoria o el costo computacional** al compartir tanta información como sea posible entre múltiples objetos. Lo logra compartiendo partes del estado del objeto (el "**estado intrínseco**") que es común a muchos objetos, mientras que el estado único de cada objeto (el "**estado extrínseco**") se mantiene por separado y se pasa al flyweight cuando se necesita.

Imagina un editor de texto que necesita representar millones de caracteres en un documento. Si cada carácter fuera un objeto completo con su propia fuente, tamaño, color, etc., el consumo de memoria sería enorme. Con el patrón Flyweight, cada instancia de un carácter solo almacena su "valor" (por ejemplo, 'A', 'b', '7'). La información sobre la fuente, tamaño y color (el estado intrínseco, que se comparte entre muchos caracteres) se almacena una sola vez y se accede a través de una "**fábrica**" de flyweights. La posición del carácter (el estado extrínseco) se pasa externamente y no es parte del objeto flyweight.

Este patrón es ideal cuando tienes una **gran cantidad de objetos similares** y gran parte de su estado se puede compartir.

```rust
&title>Ejemplo de Flyweight: Renderizado de Caracteres en un Editor de Texto<title&

use std::collections::HashMap;
use std::sync::Arc; // Para compartir el estado intrínseco de forma segura entre hilos

// El Flyweight: Caracter (solo almacena el estado intrínseco)
// Derivamos Clone para que el Arc pueda ser copiado y el Flyweight pueda ser referenciado
#[derive(Debug, PartialEq, Eq, Hash)]
struct CaracterFlyweight {
    simbolo: char,
    // Aquí irían propiedades intrínsecas que son compartidas
    // por ejemplo: propiedades de renderizado generales, no específicas de la posición
}

impl CaracterFlyweight {
    fn new(simbolo: char) -> Self {
        CaracterFlyweight { simbolo }
    }

    fn display(&self, x: i32, y: i32, fuente: &str, color: &str, tamano: u32) {
        // Aquí se usaría el estado intrínseco y extrínseco para renderizar
        println!(
            "Dibujando '{}' en ({}, {}) con fuente '{}', color '{}', tamaño {}px",
            self.simbolo, x, y, fuente, color, tamano
        );
    }
}

// La Fábrica de Flyweights (Flyweight Factory)
// Asegura que no se creen duplicados de Flyweights idénticos
struct CaracterFlyweightFactory {
    // Almacena las instancias de Flyweight ya creadas
    // Usamos Arc para permitir que múltiples referencias al mismo CaracterFlyweight
    cache: HashMap<char, Arc<CaracterFlyweight>>,
}

impl CaracterFlyweightFactory {
    fn new() -> Self {
        CaracterFlyweightFactory {
            cache: HashMap::new(),
        }
    }

    // Método para obtener un CaracterFlyweight. Si ya existe, lo devuelve; si no, lo crea.
    fn get_caracter(&mut self, simbolo: char) -> Arc<CaracterFlyweight> {
        if let Some(caracter) = self.cache.get(&simbolo) {
            println!("Reutilizando Flyweight para '{}'.", simbolo);
            Arc::clone(caracter)
        } else {
            println!("Creando nuevo Flyweight para '{}'.", simbolo);
            let nuevo_caracter = Arc::new(CaracterFlyweight::new(simbolo));
            self.cache.insert(simbolo, Arc::clone(&nuevo_caracter));
            nuevo_caracter
        }
    }
}

// Contexto/Cliente: Representa el estado extrínseco de cada carácter
// Este objeto es el que usa el Flyweight.
struct DocumentoCaracter {
    flyweight: Arc<CaracterFlyweight>, // Referencia al Flyweight compartido
    x: i32, // Posición x (estado extrínseco)
    y: i32, // Posición y (estado extrínseco)
    fuente: String, // Fuente (estado extrínseco, o podría ser intrínseco si es común)
    color: String,  // Color (estado extrínseco)
    tamano: u32,    // Tamaño (estado extrínseco)
}

impl DocumentoCaracter {
    fn new(
        flyweight: Arc<CaracterFlyweight>,
        x: i32,
        y: i32,
        fuente: &str,
        color: &str,
        tamano: u32,
    ) -> Self {
        DocumentoCaracter {
            flyweight,
            x,
            y,
            fuente: fuente.to_string(),
            color: color.to_string(),
            tamano,
        }
    }

    fn render(&self) {
        // Pasa el estado extrínseco al Flyweight para que realice la operación
        self.flyweight
            .display(self.x, self.y, &self.fuente, &self.color, self.tamano);
    }
}

fn main() {
    let mut factory = CaracterFlyweightFactory::new();

    // Crear un documento de ejemplo
    let mut documento: Vec<DocumentoCaracter> = Vec::new();

    // Caracteres con diferentes estados extrínsecos pero el mismo Flyweight
    documento.push(DocumentoCaracter::new(
        factory.get_caracter('H'),
        10, 10, "Arial", "Negro", 12,
    ));
    documento.push(DocumentoCaracter::new(
        factory.get_caracter('e'),
        20, 10, "Arial", "Negro", 12,
    ));
    documento.push(DocumentoCaracter::new(
        factory.get_caracter('l'),
        30, 10, "Arial", "Negro", 12,
    ));
    documento.push(DocumentoCaracter::new(
        factory.get_caracter('l'),
        40, 10, "Arial", "Negro", 12,
    ));
    documento.push(DocumentoCaracter::new(
        factory.get_caracter('o'),
        50, 10, "Arial", "Negro", 12,
    ));

    // Un carácter diferente con estado extrínseco y quizás un nuevo Flyweight
    documento.push(DocumentoCaracter::new(
        factory.get_caracter('W'),
        60, 20, "Times New Roman", "Rojo", 14,
    ));

    // Otro 'l' pero con diferente estilo (estado extrínseco)
    documento.push(DocumentoCaracter::new(
        factory.get_caracter('l'), // Reutiliza el Flyweight 'l'
        70, 20, "Times New Roman", "Azul", 14,
    ));

    // Renderizar el documento
    println!("\n--- Renderizando Documento ---");
    for doc_char in documento {
        doc_char.render();
    }

    // Mostrar cuántos Flyweights únicos se crearon
    println!("\nTotal de Flyweights únicos creados: {}", factory.cache.len());
    println!("Contenido de la caché de Flyweights: {:?}", factory.cache);
}
```

language&>es-ES<&