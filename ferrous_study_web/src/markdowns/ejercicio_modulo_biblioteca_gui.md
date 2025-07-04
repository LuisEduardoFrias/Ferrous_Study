---
key: 75
name: ejercicio_modulo_biblioteca_gui
addData: 3/07/2025
updateData: null
keywords: 
 - modulos
 - jercicio
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: Módulos para una biblioteca GUI
En este ejercicio, vas a reorganizar una pequeña implementación de una biblioteca GUI. Esta biblioteca define un trait Widget y algunas implementaciones de dicho trait, así como una función main.

Es habitual colocar cada tipo o conjunto de tipos que estén estrechamente relacionados en su propio módulo, por lo que cada tipo de widget debe tener su propio módulo.

Configuración de Cargo
El playground de Rust solo admite un archivo, por lo que tendrás que crear un proyecto de Cargo en tu sistema de archivos local:

```bash
cargo init gui-modules
cd gui-modules
cargo run
```

Edita el archivo src/main.rs resultante para añadir instrucciones mod y añade archivos adicionales en el directorio src.

Fuente
A continuación, se muestra la implementación de la biblioteca GUI en un solo módulo:

```rust
pub trait Widget {
    /// Ancho natural de `self`.
    fn width(&self) -> usize;

    /// Coloca el widget en un búfer.
    fn draw_into(&self, buffer: &mut dyn std::fmt::Write);

    /// Coloca el widget en una salida estándar.
    fn draw(&self) {
        let mut buffer = String::new();
        self.draw_into(&mut buffer);
        println!("{buffer}");
    }
}

pub struct Label {
    label: String,
}

impl Label {
    fn new(label: &str) -> Label {
        Label { label: label.to_owned() }
    }
}

pub struct Button {
    label: Label,
}

impl Button {
    fn new(label: &str) -> Button {
        Button { label: Label::new(label) }
    }
}

pub struct Window {
    title: String,
    widgets: Vec<Box<dyn Widget>>,
}

impl Window {
    fn new(title: &str) -> Window {
        Window { title: title.to_owned(), widgets: Vec::new() }
    }

    fn add_widget(&mut self, widget: Box<dyn Widget>) {
        self.widgets.push(widget);
    }

    fn inner_width(&self) -> usize {
        std::cmp::max(
            self.title.chars().count(),
            self.widgets.iter().map(|w| w.width()).max().unwrap_or(0),
        )
    }
}

impl Widget for Window {
    fn width(&self) -> usize {
        // Añade 4 espacios de relleno para los bordes
        self.inner_width() + 4
    }

    fn draw_into(&self, buffer: &mut dyn std::fmt::Write) {
        let mut inner = String::new();
        for widget in &self.widgets {
            widget.draw_into(&mut inner);
        }

        let inner_width = self.inner_width();

        // TAREAS: Cambia draw_into para devolver Result<(), std::fmt::Error>. A continuación, utiliza el
        // operator ? en lugar de .unwrap().
        writeln!(buffer, "+-{:-<inner_width$}-+", "").unwrap();
        writeln!(buffer, "| {:^inner_width$} |", &self.title).unwrap();
        writeln!(buffer, "+={:=<inner_width$}=+", "").unwrap();
        for line in inner.lines() {
            writeln!(buffer, "| {:inner_width$} |", line).unwrap();
        }
        writeln!(buffer, "+-{:-<inner_width$}-+", "").unwrap();
    }
}

impl Widget for Button {
    fn width(&self) -> usize {
        self.label.width() + 8 // añade un poco de espacio de relleno
    }

    fn draw_into(&self, buffer: &mut dyn std::fmt::Write) {
        let width = self.width();
        let mut label = String::new();
        self.label.draw_into(&mut label);

        writeln!(buffer, "+{:-<width$}+", "").unwrap();
        for line in label.lines() {
            writeln!(buffer, "|{:^width$}|", &line).unwrap();
        }
        writeln!(buffer, "+{:-<width$}+", "").unwrap();
    }
}

impl Widget for Label {
    fn width(&self) -> usize {
        self.label.lines().map(|line| line.chars().count()).max().unwrap_or(0)
    }

    fn draw_into(&self, buffer: &mut dyn std::fmt::Write) {
        writeln!(buffer, "{}", &self.label).unwrap();
    }
}

fn main() {
    let mut window = Window::new("Demo de la GUI de Rust 1.23");
    window.add_widget(Box::new(Label::new("Esta es una demo de la GUI con poco texto.")));
    window.add_widget(Box::new(Button::new("Haz clic aquí")));
    window.draw();
}
```

Anima a los participantes a dividir el código de un modo que les parezca natural para que se familiaricen con las declaraciones mod, use y pub. Después, comenta qué tipo de organización es más idiomática.
language&>es-ES<&