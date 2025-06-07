---
key: 136
name: anotaciones_duracion_vida
addData: 07/06/2025
updateData: null
keywords: 
 - anotaciones
 - duracion de vida
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Anotaciones de duración de vida
Una referencia tiene un valor de tiempo de vida que no debe “superar” el valor al que hace referencia. El verificador de préstamos se encarga de comprobarlo.

El tiempo de vida puede ser implícito, como hemos visto hasta ahora, pero también explícito, como es el caso de &'a Point y &'document str. Los tiempos de vida empiezan por ' y 'a es el nombre predeterminado que se suele usar. Lee &'a Point como “un Point prestado que es válido al menos durante el tiempo de vida a”.

Los tiempos de vida siempre son inferidos por el compilador: no es posible asignar un tiempo de vida manualmente. Las anotaciones explicitas de tiempo de vida crean restricciones cuando hay ambigüedad; el compilador verifica que hay una solución válida.

Los tiempos de vida se vuelven más complejos cuando se tiene en cuenta la transferencia y devolución de valores a las funciones.

```rust
#[derive(Debug)]
struct Point(i32, i32);

fn left_most(p1: &Point, p2: &Point) -> &Point {
    if p1.0 < p2.0 {
        p1
    } else {
        p2
    }
}

fn main() {
    let p1: Point = Point(10, 10);
    let p2: Point = Point(20, 20);
    let p3 = left_most(&p1, &p2); // ¿Cuál es el tiempo de vida de p3?
    println!("p3: {p3:?}");
}
```

En este ejemplo, el compilador no conoce el tiempo de vida que se debe inferir para p3. Al examinar el cuerpo de la función, se puede suponer con seguridad que el tiempo de vida de p3 es menor quep1 y p2. Sin embargo, como sucede con los tipos, Rust requiere anotaciones explícitas de los tiempos de vida en los argumentos de las funciones y los valores devueltos.

Añade 'a correctamente a left_most:

```rust
fn left_most<'a>(p1: &'a Point, p2: &'a Point) -> &'a Point {
```

Por tanto, “dado p1 y p2, que superan el tiempo de vida de 'a, el valor devuelto tiene una duración de al menos 'a.

De forma habitual, los tiempos de vida se pueden omitir, tal como se describe en la siguiente diapositiva.

language&>es-ES<&