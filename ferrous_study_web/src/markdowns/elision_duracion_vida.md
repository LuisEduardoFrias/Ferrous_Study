---
key: 137
name: elision_duracion_vida
addData: 07/06/2025
updateData: null
keywords: 
 - elision
 - duracion_vida
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Tiempos de Vida en Llamadas a Función
El tiempo de vida de los argumentos de las funciones y los valores devueltos se deben especificar de manera completa, pero Rust permite que se puedan eludir en la mayoría de los casos con unas reglas sencillas. Esto no es inferencia – solo es un atajo de sintaxis.

A cada argumento que no tenga una anotación de tiempo de vida se le proporciona uno.
Si solo hay un tiempo de vida de un argumento, se le asigna a todos los valores devueltos que no estén anotados.
Si existen varios tiempos de vida de argumentos, pero el primero es para self, ese tiempo de vida se asigna a todos los valores devueltos que no estén anotados.

```rust
#[derive(Debug)]
struct Point(i32, i32);

fn cab_distance(p1: &Point, p2: &Point) -> i32 {
    (p1.0 - p2.0).abs() + (p1.1 - p2.1).abs()
}

fn nearest<'a>(points: &'a [Point], query: &Point) -> Option<&'a Point> {
    let mut nearest = None;
    for p in points {
        if let Some((_, nearest_dist)) = nearest {
            let dist = cab_distance(p, query);
            if dist < nearest_dist {
                nearest = Some((p, dist));
            }
        } else {
            nearest = Some((p, cab_distance(p, query)));
        };
    }
    nearest.map(|(p, _)| p)
}

fn main() {
    println!(
        "{:?}",
        nearest(
            &[Point(1, 0), Point(1, 0), Point(-1, 0), Point(0, -1),],
            &Point(0, 2)
        )
    );
}
```

En este ejemplo, cab_distance se ha suprimido sin que suponga un problema.

La función nearest proporciona otro ejemplo de una función con múltiples referencias en sus argumentos que requiere una anotación explícita.

Prueba a ajustar la firma para “mentir” sobre los tiempos de vida devueltos:

```rust
fn nearest<'a, 'q>(points: &'a [Point], query: &'q Point) -> Option<&'q Point> {
```

No se hará la compilación, lo que demuestra que el compilador comprueba la validez de las anotaciones. Debes tener en cuenta que este no es el caso de los punteros sin formato (inseguros), y es uno de los motivos por los que se cometen errores con Rust inseguro.

Puede que los participantes pregunten cuándo se deben usar los tiempos de vida. Los préstamos de Rust siempre tienen tiempos de vida. En la mayoría de
las ocasiones, la omisión y la inferencia de tipos hacen que no sea necesario escribirlos. En casos más complicados, las anotaciones de tiempos de
vida pueden ayudar a resolver la ambigüedad. A menudo, sobre todo cuando se llevan a cabo prototipos, resulta más fácil trabajar únicamente con datos
propios, clonando valores siempre que sea necesario.
language&>es-ES<&