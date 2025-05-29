---
key: 68
name: memento
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - memento
 - instantánea
 - estado
 - deshacer
 - restaurar
 - guardián
 - originador
 - historial
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Memento** (Instantánea o Recuerdo)
Es un patrón **de comportamiento** que te permite **guardar y restaurar el estado previo de un objeto** sin violar el encapsulamiento. Es especialmente útil cuando necesitas implementar funcionalidades de "deshacer" (undo) o "rehacer" (redo), o para guardar el estado de un objeto en un punto específico en el tiempo.

Imagina un editor de gráficos donde el usuario dibuja formas, aplica colores, mueve objetos, etc. Cada una de estas acciones modifica el estado del documento. Si el usuario quiere "deshacer" la última acción, necesitas una forma de volver al estado anterior del documento. El patrón Memento propone que el objeto cuyo estado se quiere guardar (el **Originador**) cree un objeto "memento" (la **Instantánea**). Este memento contiene una instantánea del estado interno del originador. Luego, un objeto **Guardián** (o "Caretaker") se encarga de almacenar y gestionar estos mementos. Cuando se necesita restaurar un estado, el Guardián le pasa el memento apropiado al Originador, quien lo utiliza para restaurar su estado.

La clave del Memento es que el Guardián no puede acceder directamente al estado interno del Originador a través del memento; el memento es una "caja negra" para el Guardián. Esto **protege el encapsulamiento** del Originador.

```rust
&title>Ejemplo de Memento: Editor de Texto Simple con Historial<title&

// Memento: Almacena el estado interno del Originador
#[derive(Debug, Clone)] // Necesitamos Clone para poder copiar el memento
struct EditorTextoMemento {
    contenido: String,
    cursor_posicion: usize,
}

impl EditorTextoMemento {
    fn new(contenido: String, cursor_posicion: usize) -> Self {
        EditorTextoMemento {
            contenido,
            cursor_posicion,
        }
    }

    fn get_contenido(&self) -> &str {
        &self.contenido
    }

    fn get_cursor_posicion(&self) -> usize {
        self.cursor_posicion
    }
}

// Originador: El objeto cuyo estado queremos guardar y restaurar
struct EditorTexto {
    contenido: String,
    cursor_posicion: usize,
}

impl EditorTexto {
    fn new(contenido: &str) -> Self {
        EditorTexto {
            contenido: contenido.to_string(),
            cursor_posicion: contenido.len(), // Cursor al final inicialmente
        }
    }

    fn escribir(&mut self, texto: &str) {
        self.contenido.insert_str(self.cursor_posicion, texto);
        self.cursor_posicion += texto.len();
        println!("Escribiendo: '{}'", texto);
        self.imprimir_estado();
    }

    fn borrar_ultimo_caracter(&mut self) {
        if self.cursor_posicion > 0 {
            self.contenido.remove(self.cursor_posicion - 1);
            self.cursor_posicion -= 1;
            println!("Borrando último caracter.");
            self.imprimir_estado();
        } else {
            println!("Nada que borrar.");
        }
    }

    fn imprimir_estado(&self) {
        println!("Estado actual: \"{}\" | Cursor en: {}", self.contenido, self.cursor_posicion);
    }

    // Crea un memento del estado actual
    fn guardar(&self) -> EditorTextoMemento {
        println!("Guardando estado del editor...");
        EditorTextoMemento::new(self.contenido.clone(), self.cursor_posicion)
    }

    // Restaura el estado a partir de un memento
    fn restaurar(&mut self, memento: EditorTextoMemento) {
        println!("Restaurando estado del editor...");
        self.contenido = memento.get_contenido().to_string();
        self.cursor_posicion = memento.get_cursor_posicion();
        self.imprimir_estado();
    }
}

// Guardián (Caretaker): Se encarga de almacenar los mementos
struct HistorialEditor {
    estados: Vec<EditorTextoMemento>,
}

impl HistorialEditor {
    fn new() -> Self {
        HistorialEditor {
            estados: Vec::new(),
        }
    }

    fn guardar_estado(&mut self, memento: EditorTextoMemento) {
        self.estados.push(memento);
        println!("Estado añadido al historial.");
    }

    fn deshacer(&mut self) -> Option<EditorTextoMemento> {
        if self.estados.len() > 1 { // Mantener al menos un estado inicial si lo hubiera
            let memento = self.estados.pop();
            println!("Deshaciendo: Recuperando estado anterior.");
            memento
        } else {
            println!("Deshacer: No hay estados previos para restaurar.");
            None
        }
    }

    fn get_ultimo_estado(&self) -> Option<&EditorTextoMemento> {
        self.estados.last()
    }
}

fn main() {
    let mut editor = EditorTexto::new("");
    let mut historial = HistorialEditor::new();

    // Guardar el estado inicial
    historial.guardar_estado(editor.guardar());

    editor.escribir("Hola ");
    historial.guardar_estado(editor.guardar()); // Guardar después de escribir "Hola "

    editor.escribir("mundo");
    historial.guardar_estado(editor.guardar()); // Guardar después de escribir "mundo"

    editor.borrar_ultimo_caracter(); // Borrar 'o'
    // No guardamos este estado para poder deshacer a "Holamund"

    editor.escribir("!"); // Ahora es "Holamund!"
    historial.guardar_estado(editor.guardar());

    println!("\n--- Realizando Deshacer ---");
    if let Some(estado_anterior) = historial.deshacer() {
        editor.restaurar(estado_anterior);
    }

    println!("\n--- Realizando otro Deshacer ---");
    if let Some(estado_anterior) = historial.deshacer() {
        editor.restaurar(estado_anterior);
    }

    println!("\n--- Intentando Deshacer más allá del límite ---");
    if let Some(estado_anterior) = historial.deshacer() {
        editor.restaurar(estado_anterior);
    } else {
        println!("No se pudo deshacer más. Estamos en el primer estado guardado.");
    }
}
```

language&>es-ES<&