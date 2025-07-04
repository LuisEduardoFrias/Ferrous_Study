---
key: 76
name: solucion_modulo_biblioteca_gui
addData: 3/07/2025
updateData: null
keywords: 
 - solucion
 - modulos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solución

```bash
src
├── main.rs
├── widgets
│   ├── button.rs
│   ├── label.rs
│   └── window.rs
└── widgets.rs

```

```rust
title&>src/widgets.rs<&title
mod button;
mod label;
mod window;

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

pub use button::Button;
pub use label::Label;
pub use window::Window;
```

```rust
title&>src/widgets/label.rs<&title
use super::Widget;

pub struct Label {
    label: String,
}

impl Label {
    pub fn new(label: &str) -> Label {
        Label { label: label.to_owned() }
    }
}

impl Widget for Label {
    fn width(&self) -> usize {
        // ANCHOR_END: Label-width
        self.label.lines().map(|line| line.chars().count()).max().unwrap_or(0)
    }

    // ANCHOR: Label-draw_into
    fn draw_into(&self, buffer: &mut dyn std::fmt::Write) {
        // ANCHOR_END: Label-draw_into
        writeln!(buffer, "{}", &self.label).unwrap();
    }
}
```

```rust
title&>src/widgets/button.rs<&title
use super::{Label, Widget};

pub struct Button {
    label: Label,
}

impl Button {
    pub fn new(label: &str) -> Button {
        Button { label: Label::new(label) }
    }
}

impl Widget for Button {
    fn width(&self) -> usize {
        // ANCHOR_END: Button-width
        self.label.width() + 8 // añade un poco de espacio de relleno
    }

    // ANCHOR: Button-draw_into
    fn draw_into(&self, buffer: &mut dyn std::fmt::Write) {
        // ANCHOR_END: Button-draw_into
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
```

```rust
title&>src/widgets/window.rs<&title
use super::Widget;

pub struct Window {
    title: String,
    widgets: Vec<Box<dyn Widget>>,
}

impl Window {
    pub fn new(title: &str) -> Window {
        Window { title: title.to_owned(), widgets: Vec::new() }
    }

    pub fn add_widget(&mut self, widget: Box<dyn Widget>) {
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
        // ANCHOR_END: window-width
        // Añade 4 espacios de relleno para los bordes
        self.inner_width() + 4
    }

    // ANCHOR: Window-draw_into
    fn draw_into(&self, buffer: &mut dyn std::fmt::Write) {
        // ANCHOR_END: Window-draw_into
        let mut inner = String::new();
        for widget in &self.widgets {
            widget.draw_into(&mut inner);
        }

        let inner_width = self.inner_width();

        // TAREA: después de saber cómo gestionar los errores, puedes cambiar
        // draw_into para devolver Result<(), std::fmt::Error>. A continuación, usa
        // el operator ? en lugar de .unwrap().
        writeln!(buffer, "+-{:-<inner_width$}-+", "").unwrap();
        writeln!(buffer, "| {:^inner_width$} |", &self.title).unwrap();
        writeln!(buffer, "+={:=<inner_width$}=+", "").unwrap();
        for line in inner.lines() {
            writeln!(buffer, "| {:inner_width$} |", line).unwrap();
        }
        writeln!(buffer, "+-{:-<inner_width$}-+", "").unwrap();
    }
}
```

```rust
title&>src/main.rs<&title
mod widgets;

use widgets::Widget;

fn main() {
    let mut window = widgets::Window::new("Demo de la GUI de Rust 1.23");
    window
        .add_widget(Box::new(widgets::Label::new("Esta es una demo de la GUI con poco texto.")));
    window.add_widget(Box::new(widgets::Button::new("Haz clic aquí")));
    window.draw();
}
```

language&>es-ES<&