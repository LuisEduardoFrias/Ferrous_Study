---
key: 73
name: visitor
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - visitante
 - operación
 - estructura de objetos
 - separación
 - algoritmo
 - extensión
 - polimorfismo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Visitor** (Visitante)
Es un patrón **de comportamiento** que te permite **separar un algoritmo de la estructura de objetos** sobre la que opera. En otras palabras, permite añadir nuevas operaciones a una jerarquía de clases sin modificar esas clases.

Imagina que tienes una estructura compleja de objetos que representan componentes de un sistema eléctrico: `Cable`, `Resistor`, `Interruptor`. En algún momento, podrías necesitar realizar diferentes operaciones sobre estos componentes, como "calcular el costo", "exportar a XML", "realizar una simulación". Si añades estos métodos directamente a cada clase de componente, estarías modificando repetidamente una jerarquía de clases existente y, además, los métodos no relacionados con la funcionalidad principal de los componentes (como "calcular costo") estarían mezclados con su lógica central.

 - title&>El patrón Visitor resuelve esto:
 - Define una interfaz **`Visitante`** con un método `visitar()` para cada tipo de elemento en la estructura de objetos.
- Cada clase en la estructura de objetos implementa un método `aceptar(visitante: &mut dyn Visitante)`. Este método simplemente llama al método `visitar()` del visitante, pasándose a sí mismo como argumento.
 - Para añadir una nueva operación (por ejemplo, "exportar a XML"), creas una nueva clase `ExportarXMLVisitante` que implementa la interfaz `Visitante`. Este visitante contendrá toda la lógica para exportar cada tipo de componente a XML, sin modificar las clases de `Cable`, `Resistor` o `Interruptor`.

<br />

 - title&>Este patrón es ideal cuando:
 - Una estructura de objetos contiene muchas clases con interfaces diferentes, y quieres realizar operaciones sobre ellas que dependen de sus clases concretas.
 - Necesitas añadir nuevas operaciones a una jerarquía de clases sin modificar sus clases.
 - Los algoritmos operan sobre objetos de una estructura de objetos bien definida y conocida.

<br />

```rust
&title>Ejemplo de Visitor: Calculando el Precio y Exportando a XML de Partes de Computadora<title&

// 1. Elemento (Parte): La interfaz que los objetos de la estructura implementan
trait ParteComputadora {
    fn aceptar(&self, visitante: &dyn ParteComputadoraVisitante);
}

// Parte Concreta: CPU
struct Cpu {
    precio: f64,
}

impl Cpu {
    fn new(precio: f64) -> Self {
        Cpu { precio }
    }
    fn get_precio(&self) -> f64 { self.precio }
}

impl ParteComputadora for Cpu {
    fn aceptar(&self, visitante: &dyn ParteComputadoraVisitante) {
        visitante.visitar_cpu(self);
    }
}

// Parte Concreta: PlacaBase
struct PlacaBase {
    precio: f64,
}

impl PlacaBase {
    fn new(precio: f64) -> Self {
        PlacaBase { precio }
    }
    fn get_precio(&self) -> f64 { self.precio }
}

impl ParteComputadora for PlacaBase {
    fn aceptar(&self, visitante: &dyn ParteComputadoraVisitante) {
        visitante.visitar_placa_base(self);
    }
}

// Parte Concreta: Memoria
struct Memoria {
    precio: f64,
    capacidad_gb: u32,
}

impl Memoria {
    fn new(precio: f64, capacidad_gb: u32) -> Self {
        Memoria { precio, capacidad_gb }
    }
    fn get_precio(&self) -> f64 { self.precio }
    fn get_capacidad_gb(&self) -> u32 { self.capacidad_gb }
}

impl ParteComputadora for Memoria {
    fn aceptar(&self, visitante: &dyn ParteComputadoraVisitante) {
        visitante.visitar_memoria(self);
    }
}

// Parte Concreta: Computadora (puede contener otras partes)
struct Computadora {
    partes: Vec<Box<dyn ParteComputadora>>,
}

impl Computadora {
    fn new() -> Self {
        Computadora { partes: Vec::new() }
    }

    fn add_parte(&mut self, parte: Box<dyn ParteComputadora>) {
        self.partes.push(parte);
    }
}

impl ParteComputadora for Computadora {
    fn aceptar(&self, visitante: &dyn ParteComputadoraVisitante) {
        for parte in &self.partes {
            parte.aceptar(visitante); // El visitante visita cada sub-parte
        }
        // El visitante también puede visitar la computadora en sí misma si fuera necesario
        // visitante.visitar_computadora(self);
    }
}


// 2. Visitor: La interfaz que define las operaciones para cada tipo de elemento
trait ParteComputadoraVisitante {
    fn visitar_cpu(&self, cpu: &Cpu);
    fn visitar_placa_base(&self, placa_base: &PlacaBase);
    fn visitar_memoria(&self, memoria: &Memoria);
    // Podríamos añadir fn visitar_computadora si necesitamos lógica específica para el agregado
}

// 3. Visitor Concreto: Calcula el precio total
struct PrecioComputadoraVisitante {
    precio_total: f64,
}

impl PrecioComputadoraVisitante {
    fn new() -> Self {
        PrecioComputadoraVisitante { precio_total: 0.0 }
    }

    fn get_precio_total(&self) -> f64 {
        self.precio_total
    }
}

impl ParteComputadoraVisitante for PrecioComputadoraVisitante {
    fn visitar_cpu(&self, cpu: &Cpu) {
        // En Rust, para que el visitante pueda modificar su propio estado (precio_total),
        // necesitaríamos que los métodos de `ParteComputadoraVisitante` tomen `&mut self`
        // o que el `precio_total` esté dentro de un `RefCell` o `Mutex`.
        // Para simplicidad conceptual, imprimimos el precio aquí.
        println!("  Visitante de Precio: CPU cuesta ${}", cpu.get_precio());
        // En una implementación real: self.precio_total += cpu.get_precio();
    }

    fn visitar_placa_base(&self, placa_base: &PlacaBase) {
        println!("  Visitante de Precio: Placa Base cuesta ${}", placa_base.get_precio());
        // En una implementación real: self.precio_total += placa_base.get_precio();
    }

    fn visitar_memoria(&self, memoria: &Memoria) {
        println!("  Visitante de Precio: Memoria ({}GB) cuesta ${}", memoria.get_capacidad_gb(), memoria.get_precio());
        // En una implementación real: self.precio_total += memoria.get_precio();
    }
}

// Para que el Visitante de Precio pueda acumular el total, necesitamos mutabilidad.
// Un enfoque idiomático en Rust es que el Visitante concrete sea mutable y los métodos
// del trait también tomen `&mut self`.
trait ParteComputadoraVisitanteMutable {
    fn visitar_cpu(&mut self, cpu: &Cpu);
    fn visitar_placa_base(&mut self, placa_base: &PlacaBase);
    fn visitar_memoria(&mut self, memoria: &Memoria);
}

struct PrecioComputadoraVisitanteMutable {
    precio_total: f64,
}

impl PrecioComputadoraVisitanteMutable {
    fn new() -> Self {
        PrecioComputadoraVisitanteMutable { precio_total: 0.0 }
    }

    fn get_precio_total(&self) -> f64 {
        self.precio_total
    }
}

impl ParteComputadoraVisitanteMutable for PrecioComputadoraVisitanteMutable {
    fn visitar_cpu(&mut self, cpu: &Cpu) {
        println!("  Visitante de Precio: CPU cuesta ${}", cpu.get_precio());
        self.precio_total += cpu.get_precio();
    }

    fn visitar_placa_base(&mut self, placa_base: &PlacaBase) {
        println!("  Visitante de Precio: Placa Base cuesta ${}", placa_base.get_precio());
        self.precio_total += placa_base.get_precio();
    }

    fn visitar_memoria(&mut self, memoria: &Memoria) {
        println!("  Visitante de Precio: Memoria ({}GB) cuesta ${}", memoria.get_capacidad_gb(), memoria.get_precio());
        self.precio_total += memoria.get_precio();
    }
}


// 4. Otro Visitor Concreto: Exporta la estructura a XML
struct XmlExportarVisitante;

impl ParteComputadoraVisitante for XmlExportarVisitante {
    fn visitar_cpu(&self, cpu: &Cpu) {
        println!("  <cpu precio=\"{}\"/>", cpu.get_precio());
    }

    fn visitar_placa_base(&self, placa_base: &PlacaBase) {
        println!("  <placa_base precio=\"{}\"/>", placa_base.get_precio());
    }

    fn visitar_memoria(&self, memoria: &Memoria) {
        println!("  <memoria precio=\"{}\" capacidad_gb=\"{}\"/>", memoria.get_precio(), memoria.get_capacidad_gb());
    }
}


fn main() {
    // Construir la estructura de objetos (la computadora con sus partes)
    let mut mi_computadora = Computadora::new();
    mi_computadora.add_parte(Box::new(Cpu::new(350.0)));
    mi_computadora.add_parte(Box::new(PlacaBase::new(120.0)));
    mi_computadora.add_parte(Box::new(Memoria::new(80.0, 16)));
    mi_computadora.add_parte(Box::new(Memoria::new(80.0, 16))); // Dos módulos de memoria

    // Crear un visitante para calcular el precio y pasárselo a la estructura
    println!("--- Calculando el precio total de la computadora ---");
    let mut precio_visitante = PrecioComputadoraVisitanteMutable::new();
    // La estructura de objetos "acepta" al visitante, permitiéndole "visitar" cada parte
    mi_computadora.aceptar(&precio_visitante); // Usamos la interfaz sin mutabilidad para llamar aceptar
    println!("Precio total estimado: ${}", precio_visitante.get_precio_total());

    // Crear otro visitante para exportar a XML
    println!("\n--- Exportando la estructura de la computadora a XML ---");
    let xml_visitante = XmlExportarVisitante;
    mi_computadora.aceptar(&xml_visitante);
}
```

language&>es-ES<&