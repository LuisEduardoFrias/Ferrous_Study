---
key: 57
name: bridge
addData: 28/05/2025
updateData: null
keywords: 
 - estructural
 - puente
 - abstracción
 - implementación
 - desacoplamiento
 - herencia
 - composición
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Bridge** (Puente)
Es un patrón **estructural** que tiene como objetivo **desacoplar una abstracción de su implementación** para que ambas puedan variar independientemente. Es decir, si tienes una jerarquía de "abstracciones" (lo que algo es) y una jerarquía de "implementaciones" (cómo se hace algo), el Bridge te permite conectarlas de manera flexible en lugar de acoplarlas rígidamente a través de herencia.

Imagina que estás diseñando un sistema de dibujo para diferentes formas (círculo, cuadrado) y necesitas que estas formas se puedan dibujar en diferentes plataformas de renderizado (OpenGL, DirectX, SVG). Sin el patrón Bridge, podrías terminar con una explosión de clases como `CirculoOpenGL`, `CuadradoDirectX`, `CirculoSVG`, etc., lo que se vuelve inmanejable. El Bridge te permite tener una jerarquía de formas y una jerarquía de renderizadores, y "unir" una forma con un renderizador en tiempo de ejecución.

El patrón Bridge promueve el **principio de abierto/cerrado**, ya que puedes añadir nuevas formas o nuevos renderizadores sin modificar el código existente. Utiliza la **composición** en lugar de la herencia para lograr el desacoplamiento.

```rust
&title>Ejemplo de Bridge: Formas Gráficas y Renderizadores<title&

// --- Implementación (Renderer) ---
// La interfaz para los renderizadores (lo que implementa la funcionalidad de dibujo)
trait Renderer {
    fn render_circulo(&self, radio: f64);
    fn render_rectangulo(&self, ancho: f64, alto: f64);
}

// Implementación concreta de un renderizador OpenGL
struct OpenGLRenderer;
impl Renderer for OpenGLRenderer {
    fn render_circulo(&self, radio: f64) {
        println!("OpenGL: Dibujando un círculo con radio {}.", radio);
    }
    fn render_rectangulo(&self, ancho: f64, alto: f64) {
        println!("OpenGL: Dibujando un rectángulo de {}x{}.", ancho, alto);
    }
}

// Implementación concreta de un renderizador DirectX
struct DirectXRenderer;
impl Renderer for DirectXRenderer {
    fn render_circulo(&self, radio: f64) {
        println!("DirectX: Dibujando un círculo con radio {}.", radio);
    }
    fn render_rectangulo(&self, ancho: f64, alto: f64) {
        println!("DirectX: Dibujando un rectángulo de {}x{}.", ancho, alto);
    }
}

// --- Abstracción (Shape) ---
// La interfaz para las formas (lo que se "dibuja")
trait Shape {
    fn dibujar(&self);
}

// Implementaciones concretas de las formas, que contienen una referencia a un Renderer
struct Circle {
    radio: f64,
    renderer: Box<dyn Renderer>, // El puente a la implementación
}

impl Circle {
    fn new(radio: f64, renderer: Box<dyn Renderer>) -> Self {
        Circle { radio, renderer }
    }
}

impl Shape for Circle {
    fn dibujar(&self) {
        self.renderer.render_circulo(self.radio);
    }
}

struct Rectangle {
    ancho: f64,
    alto: f64,
    renderer: Box<dyn Renderer>, // El puente a la implementación
}

impl Rectangle {
    fn new(ancho: f64, alto: f64, renderer: Box<dyn Renderer>) -> Self {
        Rectangle { ancho, alto, renderer }
    }
}

impl Shape for Rectangle {
    fn dibujar(&self) {
        self.renderer.render_rectangulo(self.ancho, self.alto);
    }
}

fn main() {
    // Creamos diferentes renderizadores
    let opengl_renderer = Box::new(OpenGLRenderer);
    let directx_renderer = Box::new(DirectXRenderer);

    // Creamos formas usando diferentes renderizadores
    let circle_opengl = Circle::new(10.0, opengl_renderer);
    circle_opengl.dibujar();

    let rectangle_directx = Rectangle::new(5.0, 8.0, directx_renderer);
    rectangle_directx.dibujar();

    // Podemos reutilizar renderizadores o crear nuevas combinaciones
    let opengl_renderer_again = Box::new(OpenGLRenderer);
    let rectangle_opengl = Rectangle::new(12.0, 6.0, opengl_renderer_again);
    rectangle_opengl.dibujar();

    // Podemos tener una colección de formas y dibujarlas sin saber su renderizador
    let mut formas: Vec<Box<dyn Shape>> = Vec::new();
    formas.push(Box::new(Circle::new(7.0, Box::new(DirectXRenderer))));
    formas.push(Box::new(Rectangle::new(3.0, 4.0, Box::new(OpenGLRenderer))));

    println!("\n--- Dibujando colección de formas ---");
    for forma in formas {
        forma.dibujar();
    }
}
```
language&>es-ES<&