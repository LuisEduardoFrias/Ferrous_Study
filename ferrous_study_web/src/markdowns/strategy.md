---
key: 71
name: strategy
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - estrategia
 - algoritmo
 - intercambio
 - polimorfismo
 - encapsulamiento
 - flexibilidad
 - comportamiento variable
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Strategy** (Estrategia)
Es un patrón **de comportamiento** que te permite definir una familia de algoritmos, encapsular cada uno de ellos y hacerlos intercambiables. Este patrón permite que el algoritmo varíe independientemente de los clientes que lo utilizan.

Imagina una aplicación de comercio electrónico que necesita calcular los costos de envío. Los costos pueden variar según diferentes estrategias: envío estándar, envío express, envío internacional, envío con descuento para clientes premium, etc. Sin el patrón Strategy, podrías terminar con muchas sentencias `if/else` o `switch` para determinar qué algoritmo de envío usar. El patrón Strategy resuelve esto creando una interfaz común para todas las estrategias de envío (`EstrategiaEnvio`) y luego implementando cada estrategia como una clase separada (`EnvioEstandar`, `EnvioExpress`, etc.). La clase que necesita calcular el envío (el **Contexto**, por ejemplo, `CalculadorEnvio`) tiene una referencia a una de estas estrategias y delega la tarea de cálculo a ella.

 - title&>Este patrón es ideal cuando:
 - Un objeto tiene diferentes comportamientos que se pueden implementar como algoritmos intercambiables.
 - Quieres **evitar tener múltiples condicionales** (`if/else` o `switch`) para seleccionar un comportamiento.
 - Quieres que el **cliente no necesite conocer los detalles de implementación** de los algoritmos.
 - Necesitas cambiar el algoritmo utilizado por un objeto en tiempo de ejecución.

<br />

```rust
&title>Ejemplo de Strategy: Algoritmos de Ordenación de Datos<title&
// Trait Strategy: Define la interfaz común para todas las estrategias (algoritmos)
trait EstrategiaOrdenacion {
    fn ordenar(&self, datos: &mut Vec<i32>);
}

// Estrategia Concreta: Ordenación por Burbuja (Bubble Sort)
struct BubbleSortStrategy;

impl EstrategiaOrdenacion for BubbleSortStrategy {
    fn ordenar(&self, datos: &mut Vec<i32>) {
        println!("  Ejecutando Ordenación por Burbuja...");
        let n = datos.len();
        for i in 0..n {
            for j in 0..n - 1 - i {
                if datos[j] > datos[j + 1] {
                    datos.swap(j, j + 1);
                }
            }
        }
    }
}

// Estrategia Concreta: Ordenación por Inserción (Insertion Sort)
struct InsertionSortStrategy;

impl EstrategiaOrdenacion for InsertionSortStrategy {
    fn ordenar(&self, datos: &mut Vec<i32>) {
        println!("  Ejecutando Ordenación por Inserción...");
        for i in 1..datos.len() {
            let mut j = i;
            while j > 0 && datos[j - 1] > datos[j] {
                datos.swap(j - 1, j);
                j -= 1;
            }
        }
    }
}

// Estrategia Concreta: Ordenación Rápida (Quick Sort) - Usando el de la librería estándar para simplificar
struct QuickSortStrategy;

impl EstrategiaOrdenacion for QuickSortStrategy {
    fn ordenar(&self, datos: &mut Vec<i32>) {
        println!("  Ejecutando Ordenación Rápida (implementación de la librería estándar)...");
        datos.sort(); // Rust's sort es un Timsort híbrido, muy eficiente
    }
}

// Contexto: La clase que utiliza una estrategia para realizar una operación
struct ContextoOrdenacion {
    estrategia: Box<dyn EstrategiaOrdenacion>,
}

impl ContextoOrdenacion {
    // Permite al cliente establecer la estrategia en tiempo de construcción o ejecución
    fn new(estrategia: Box<dyn EstrategiaOrdenacion>) -> Self {
        ContextoOrdenacion { estrategia }
    }

    fn set_estrategia(&mut self, estrategia: Box<dyn EstrategiaOrdenacion>) {
        self.estrategia = estrategia;
    }

    // Delega la operación de ordenación a la estrategia actual
    fn ejecutar_ordenacion(&self, datos: &mut Vec<i32>) {
        println!("Preparando para ordenar datos: {:?}", datos);
        self.estrategia.ordenar(datos);
        println!("Datos ordenados: {:?}\n", datos);
    }
}


fn main() {
    let mut datos1 = vec![5, 2, 8, 1, 9, 4];
    let mut datos2 = vec![10, 3, 7, 6, 2, 1];
    let mut datos3 = vec![100, 20, 50, 5, 80];

    // Usando la estrategia de Burbuja
    println!("--- Usando Bubble Sort ---");
    let mut contexto = ContextoOrdenacion::new(Box::new(BubbleSortStrategy));
    contexto.ejecutar_ordenacion(&mut datos1);

    // Cambiando a la estrategia de Inserción en tiempo de ejecución
    println!("--- Cambiando a Insertion Sort ---");
    contexto.set_estrategia(Box::new(InsertionSortStrategy));
    contexto.ejecutar_ordenacion(&mut datos2);

    // Cambiando a la estrategia de Quick Sort
    println!("--- Cambiando a Quick Sort ---");
    contexto.set_estrategia(Box::new(QuickSortStrategy));
    contexto.ejecutar_ordenacion(&mut datos3);

    // Otro ejemplo con la misma estrategia
    let mut datos4 = vec![7, 1, 5, 3, 9, 0];
    println!("--- Usando Quick Sort de nuevo ---");
    contexto.ejecutar_ordenacion(&mut datos4);
}
```

language&>es-ES<&