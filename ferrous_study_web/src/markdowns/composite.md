---
key: 58
name: composite
addData: 28/05/2025
updateData: null
keywords: 
 - estructural
 - compuesto
 - objetos
 - árbol
 - jerarquía
 - uniformidad
 - recursividad
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Composite** (Compuesto)
Es un patrón **estructural** que te permite componer objetos en estructuras de árbol para representar jerarquías de parte-todo. Este patrón permite que los clientes traten a los objetos individuales y a las composiciones de objetos de manera uniforme. Es decir, puedes operar sobre un objeto simple o sobre un grupo de objetos de la misma manera.

Imagina que tienes un sistema de archivos, donde tanto los archivos individuales como los directorios (que contienen otros archivos y directorios) son componentes que pueden ser listados, copiados o eliminados. El patrón Composite te permite tratar tanto los archivos como los directorios como "Componentes del Sistema de Archivos" genéricos. Esto simplifica el código del cliente, ya que no necesita distinguir entre objetos simples y objetos compuestos cuando realiza operaciones.

El Composite es ideal para situaciones donde quieres construir una jerarquía de objetos y quieres que el cliente ignore si está trabajando con una hoja (un objeto individual) o un compuesto (un grupo de objetos).

```rust
&title>Ejemplo de Composite: Sistema de Archivos Simple<title&
// Component Trait: Interfaz común para archivos y directorios
trait ComponenteSistemaArchivos {
    fn get_nombre(&self) -> &str;
    fn display(&self, indent: usize);
    fn get_tamano(&self) -> u32; // Nueva operación: obtener tamaño
}

// Leaf: Representa un archivo individual
struct Archivo {
    nombre: String,
    tamano: u32,
}

impl Archivo {
    fn new(nombre: &str, tamano: u32) -> Self {
        Archivo {
            nombre: nombre.to_string(),
            tamano,
        }
    }
}

impl ComponenteSistemaArchivos for Archivo {
    fn get_nombre(&self) -> &str {
        &self.nombre
    }

    fn display(&self, indent: usize) {
        let prefix = "  ".repeat(indent);
        println!("{}- Archivo: {} ({} KB)", prefix, self.nombre, self.tamano);
    }

    fn get_tamano(&self) -> u32 {
        self.tamano
    }
}

// Composite: Representa un directorio que puede contener archivos u otros directorios
struct Directorio {
    nombre: String,
    children: Vec<Box<dyn ComponenteSistemaArchivos>>, // Puede contener hojas o composites
}

impl Directorio {
    fn new(nombre: &str) -> Self {
        Directorio {
            nombre: nombre.to_string(),
            children: Vec::new(),
        }
    }

    fn add(&mut self, component: Box<dyn ComponenteSistemaArchivos>) {
        self.children.push(component);
    }
}

impl ComponenteSistemaArchivos for Directorio {
    fn get_nombre(&self) -> &str {
        &self.nombre
    }

    fn display(&self, indent: usize) {
        let prefix = "  ".repeat(indent);
        println!("{}+ Directorio: {}", prefix, self.nombre);
        for child in &self.children {
            child.display(indent + 1);
        }
    }

    fn get_tamano(&self) -> u32 {
        self.children.iter().map(|c| c.get_tamano()).sum()
    }
}

fn main() {
    // Crear archivos
    let archivo1 = Box::new(Archivo::new("documento.txt", 100));
    let archivo2 = Box::new(Archivo::new("imagen.jpg", 500));
    let archivo3 = Box::new(Archivo::new("reporte.pdf", 250));
    let archivo4 = Box::new(Archivo::new("video.mp4", 2000));

    // Crear directorios
    let mut dir_documentos = Directorio::new("Documentos");
    dir_documentos.add(archivo1);
    dir_documentos.add(archivo3);

    let mut dir_multimedia = Directorio::new("Multimedia");
    dir_multimedia.add(archivo2);
    dir_multimedia.add(archivo4);

    let mut dir_raiz = Directorio::new("Raiz");
    dir_raiz.add(Box::new(Archivo::new("README.md", 50))); // Archivo en la raíz
    dir_raiz.add(Box::new(dir_documentos)); // Añadir un directorio compuesto
    dir_raiz.add(Box::new(dir_multimedia)); // Añadir otro directorio compuesto

    // Mostrar la estructura del sistema de archivos y calcular tamaños
    println!("--- Estructura del Sistema de Archivos ---");
    dir_raiz.display(0);
    println!("---------------------------------------");
    println!("Tamaño total de 'Raiz': {} KB", dir_raiz.get_tamano());

    // Podemos tratar un archivo individual como un componente y obtener su tamaño
    let solo_un_archivo = Archivo::new("mi_archivo_suelto.log", 75);
    println!("Tamaño de '{}': {} KB", solo_un_archivo.get_nombre(), solo_un_archivo.get_tamano());
}
```
language&>es-ES<&