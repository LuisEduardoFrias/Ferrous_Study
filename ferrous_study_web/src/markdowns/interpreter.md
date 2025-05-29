---
key: 65
name: interpreter
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - intérprete
 - gramática
 - lenguaje
 - expresión
 - árbol de sintaxis
 - DSL
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Interpreter** (Intérprete)
Es un patrón **de comportamiento** que define una representación para la gramática de un lenguaje y un intérprete para esa representación. Es útil cuando tienes un lenguaje (simple, un **DSL - Domain Specific Language**) cuyas expresiones necesitan ser evaluadas o interpretadas.

Imagina que estás construyendo una aplicación que permite a los usuarios definir reglas de búsqueda complejas, como "edad > 30 Y (ciudad = 'Madrid' O ciudad = 'Barcelona')". Si estas reglas se representan como cadenas de texto, necesitas una forma de analizarlas y ejecutarlas. El patrón Interpreter sugiere crear una clase para cada regla gramatical (por ejemplo, `ExpresionY`, `ExpresionO`, `ExpresionMayorQue`, `ExpresionLiteral`) y luego construir un "árbol de sintaxis abstracta" (AST) a partir de la expresión del usuario. Cada nodo en el AST sería un objeto de expresión que sabe cómo interpretarse a sí mismo.

 - title&>Este patrón es especialmente adecuado para:
 - **Lenguajes simples o DSLs** que se pueden expresar como una gramática.
 - Cuando la gramática es relativamente **estable** y no cambia con frecuencia.
 - Cuando necesitas **evaluar expresiones** en tiempo de ejecución.

<br />

```rust
&title>Ejemplo de Interpreter: Evaluación de Expresiones Booleanas Simples<title&

// Contexto: Almacena información global o estado que el intérprete pueda necesitar
struct Contexto {
    variables: std::collections::HashMap<String, bool>,
}

impl Contexto {
    fn new() -> Self {
        Contexto {
            variables: std::collections::HashMap::new(),
        }
    }

    fn set_variable(&mut self, nombre: &str, valor: bool) {
        self.variables.insert(nombre.to_string(), valor);
    }

    fn get_variable(&self, nombre: &str) -> Option<&bool> {
        self.variables.get(nombre)
    }
}

// Abstract Expression: La interfaz común para todas las expresiones
trait Expresion {
    fn interpretar(&self, contexto: &Contexto) -> bool;
}

// Terminal Expression: Representa un valor booleano literal
struct LiteralExpresion {
    valor: bool,
}

impl LiteralExpresion {
    fn new(valor: bool) -> Self {
        LiteralExpresion { valor }
    }
}

impl Expresion for LiteralExpresion {
    fn interpretar(&self, _contexto: &Contexto) -> bool {
        self.valor
    }
}

// Terminal Expression: Representa una variable (nombre)
struct VariableExpresion {
    nombre: String,
}

impl VariableExpresion {
    fn new(nombre: &str) -> Self {
        VariableExpresion {
            nombre: nombre.to_string(),
        }
    }
}

impl Expresion for VariableExpresion {
    fn interpretar(&self, contexto: &Contexto) -> bool {
        *contexto.get_variable(&self.nombre).unwrap_or(&false) // Por defecto false si no existe
    }
}


// Non-Terminal Expression: Representa la operación AND
struct AndExpresion {
    izquierda: Box<dyn Expresion>,
    derecha: Box<dyn Expresion>,
}

impl AndExpresion {
    fn new(izquierda: Box<dyn Expresion>, derecha: Box<dyn Expresion>) -> Self {
        AndExpresion { izquierda, derecha }
    }
}

impl Expresion for AndExpresion {
    fn interpretar(&self, contexto: &Contexto) -> bool {
        self.izquierda.interpretar(contexto) && self.derecha.interpretar(contexto)
    }
}

// Non-Terminal Expression: Representa la operación OR
struct OrExpresion {
    izquierda: Box<dyn Expresion>,
    derecha: Box<dyn Expresion>,
}

impl OrExpresion {
    fn new(izquierda: Box<dyn Expresion>, derecha: Box<dyn Expresion>) -> Self {
        OrExpresion { izquierda, derecha }
    }
}

impl Expresion for OrExpresion {
    fn interpretar(&self, contexto: &Contexto) -> bool {
        self.izquierda.interpretar(contexto) || self.derecha.interpretar(contexto)
    }
}

// Non-Terminal Expression: Representa la operación NOT
struct NotExpresion {
    expresion: Box<dyn Expresion>,
}

impl NotExpresion {
    fn new(expresion: Box<dyn Expresion>) -> Self {
        NotExpresion { expresion }
    }
}

impl Expresion for NotExpresion {
    fn interpretar(&self, contexto: &Contexto) -> bool {
        !self.expresion.interpretar(contexto)
    }
}


fn main() {
    // Definimos un contexto con algunas variables
    let mut contexto = Contexto::new();
    contexto.set_variable("A", true);
    contexto.set_variable("B", false);
    contexto.set_variable("C", true);

    // Creamos un árbol de expresiones (el AST)
    // Expresión: (A Y NO B) O C
    // Equivalente a: (true AND NOT false) OR true => (true AND true) OR true => true OR true => true

    let expresion_a = Box::new(VariableExpresion::new("A"));
    let expresion_b = Box::new(VariableExpresion::new("B"));
    let expresion_c = Box::new(VariableExpresion::new("C"));

    let not_b = Box::new(NotExpresion::new(expresion_b));
    let a_and_not_b = Box::new(AndExpresion::new(expresion_a, not_b));
    let final_expresion = Box::new(OrExpresion::new(a_and_not_b, expresion_c));

    println!("--- Evaluando Expresión Booleana ---");
    println!("Variables en contexto: {:?}", contexto.variables);
    println!("Expresión a evaluar: (A AND NOT B) OR C");

    let resultado = final_expresion.interpretar(&contexto);
    println!("Resultado de la expresión: {}", resultado); // Esperamos 'true'

    // Cambiemos el contexto y reevaluemos
    println!("\n--- Cambiando contexto y reevaluando ---");
    contexto.set_variable("A", false); // A = false
    // Ahora: (false AND NOT false) OR true => (false AND true) OR true => false OR true => true

    println!("Variables en contexto: {:?}", contexto.variables);
    let resultado_nuevo = final_expresion.interpretar(&contexto);
    println!("Resultado de la expresión con A=false: {}", resultado_nuevo); // Esperamos 'true'


    println!("\n--- Otro ejemplo: A Y B ---");
    let a_and_b = Box::new(AndExpresion::new(
        Box::new(VariableExpresion::new("A")),
        Box::new(VariableExpresion::new("B")),
    ));
    println!("Expresión a evaluar: A Y B");
    println!("Resultado: {}", a_and_b.interpretar(&contexto)); // Esperamos 'false' (A=false, B=false)

    contexto.set_variable("B", true); // B = true
    println!("Variables en contexto: {:?}", contexto.variables);
    println!("Resultado con B=true: {}", a_and_b.interpretar(&contexto)); // Esperamos 'false' (A=false, B=true)
}
```

language&>es-ES<&

