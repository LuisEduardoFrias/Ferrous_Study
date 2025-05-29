---
key: 72
name: template_method
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - plantilla
 - algoritmo
 - herencia
 - subrutinas
 - pasos
 - esqueleto
 - reutilización
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Template Method** (Método Plantilla)
Es un patrón **de comportamiento** que define el **esqueleto de un algoritmo** en una operación, delegando algunos pasos a las subclases. Permite que las subclases redefinan ciertos pasos de un algoritmo sin cambiar su estructura general.

Imagina que estás construyendo una aplicación para procesar diferentes tipos de documentos (PDF, DOCX, TXT). 

El proceso general de "procesar documento" podría ser el mismo para todos: 1) abrir el documento, 2) leer contenido, 3) procesar contenido, 4) guardar resultado, 5) cerrar documento. Sin embargo, los pasos 1, 2, 3, 4 y 5 pueden variar ligeramente para cada tipo de documento. El patrón Template Method te permite definir un método `procesar_documento()` en una clase base (`ProcesadorDocumentoAbstracto`) que contiene el algoritmo completo, pero deja que las subclases (`ProcesadorPDF`, `ProcesadorDOCX`, `ProcesadorTXT`) implementen los detalles específicos de cada paso (por ejemplo, `abrir_pdf()`, `leer_docx()`, `procesar_txt()`).

 - title&>Este patrón es ideal para:
 - Implementar las partes invariantes de un algoritmo una vez, y dejar que las subclases implementen el comportamiento que puede variar.
 - Evitar la duplicación de código al reutilizar la estructura común del algoritmo.
 - Controlar cómo se personaliza un algoritmo, ya que solo los "pasos gancho" (hook steps) o métodos abstractos pueden ser sobrescritos por las subclases.

<br />

```rust
&title>Ejemplo de Template Method: Construcción de una Casa<title&

// Clase Abstracta (o Trait en Rust): Define el método plantilla y operaciones primitivas
trait ConstructorCasa {
    // El "método plantilla" que define el esqueleto del algoritmo
    fn construir_casa(&self) {
        println!("--- Iniciando construcción de la casa ---");
        self.cimientos();
        self.construir_paredes();
        self.construir_techo();
        self.instalar_ventanas();
        self.instalar_puertas();
        self.acabados(); // Un paso "gancho" opcional
        println!("--- Casa construida con éxito ---\n");
    }

    // Operaciones primitivas que las subclases deben implementar
    fn cimientos(&self);
    fn construir_paredes(&self);
    fn construir_techo(&self);

    // Operaciones primitivas con implementación por defecto o pasos gancho
    fn instalar_ventanas(&self) {
        println!("  Instalando ventanas estándar.");
    }

    fn instalar_puertas(&self) {
        println!("  Instalando puertas estándar.");
    }

    // Un "paso gancho" que puede ser sobrescrito (o no hacer nada)
    fn acabados(&self) {
        // Por defecto, no hay acabados especiales
    }
}

// Clase Concreta: Constructor de Casa de Madera
struct ConstructorCasaMadera;
impl ConstructorCasa for ConstructorCasaMadera {
    fn cimientos(&self) {
        println!("  Cimientos: Colocando base de hormigón ligera.");
    }

    fn construir_paredes(&self) {
        println!("  Paredes: Levantando estructuras de madera y revestimiento.");
    }

    fn construir_techo(&self) {
        println!("  Techo: Colocando tejado de madera con tejas asfálticas.");
    }

    // Sobrescribimos un paso opcional
    fn acabados(&self) {
        println!("  Acabados: Aplicando barniz y detalles rústicos de madera.");
    }
}

// Clase Concreta: Constructor de Casa de Ladrillo
struct ConstructorCasaLadrillo;
impl ConstructorCasa for ConstructorCasaLadrillo {
    fn cimientos(&self) {
        println!("  Cimientos: Excavando y vertiendo cimientos sólidos de hormigón.");
    }

    fn construir_paredes(&self) {
        println!("  Paredes: Levantando muros de ladrillo y mortero.");
    }

    fn construir_techo(&self) {
        println!("  Techo: Instalando estructura de acero y cubierta de tejas de cerámica.");
    }

    fn instalar_ventanas(&self) {
        // Podríamos sobrescribir este paso también si quisieramos
        println!("  Instalando ventanas de doble acristalamiento reforzado.");
    }

    fn acabados(&self) {
        println!("  Acabados: Enlucido interior y aplicación de pintura exterior texturizada.");
    }
}


fn main() {
    println!("Construyendo una casa de madera:");
    let constructor_madera = ConstructorCasaMadera;
    constructor_madera.construir_casa();

    println!("Construyendo una casa de ladrillo:");
    let constructor_ladrillo = ConstructorCasaLadrillo;
    constructor_ladrillo.construir_casa();
}
```

language&>es-ES<&