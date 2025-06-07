---
key: 130
name: borrow
addData: 07/06/2025
updateData: null
keywords: 
 - borrow
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Emprestar (borrow) un valor
En lugar de transferir el ownership (posesión) al llamar a una función, puedes permitir que una función tome prestado el valor:

La función add toma prestados dos puntos y devuelve uno nuevo.
El llamador conserva el ownership de las entradas.

```rust
#[derive(Debug)]
struct Point(i32, i32);

fn add(p1: &Point, p2: &Point) -> Point {
    Point(p1.0 + p2.0, p1.1 + p2.1)
}

fn main() {
    let p1 = Point(3, 4);
    let p2 = Point(10, 20);
    let p3 = add(&p1, &p2);
    println!("{p1:?} + {p2:?} = {p3:?}");
}
```

En esta diapositiva se repasará el material de las referencias desde día 1 y se ampliará un poco para incluir los argumentos de las funciones y los valores devueltos.

Más información
Notas sobre la devolución de resultados de la stack:

Demuestra que la instrucción de retorno de add es barato porque el compilador puede eliminar la operación de copia. Cambia el código anterior para imprimir las direcciones de la stack y ejecutarlas en el Playground o consulta el ensamblador en Godbolt. En el nivel de optimización “DEBUG”, las direcciones deberían cambiar. Sin embargo, deberían mantenerse igual modificar la configuración “RELEASE”:

```rust
#[derive(Debug)]
struct Point(i32, i32);

fn add(p1: &Point, p2: &Point) -> Point {
    let p = Point(p1.0 + p2.0, p1.1 + p2.1);
    println!("&p.0: {:p}", &p.0);
    p
}

pub fn main() {
    let p1 = Point(3, 4);
    let p2 = Point(10, 20);
    let p3 = add(&p1, &p2);
    println!("&p3.0: {:p}", &p3.0);
    println!("{p1:?} + {p2:?} = {p3:?}");
}
```

El compilador Rust puede hacer enlineamiento automático que puede ser deshabilitado al nivel de una función con #[inline(never)].

Una vez deshabilitado, la dirección impresa cambiara en todos los niveles de optimización. Mirando en Godbolt o Playground, uno puede ver que en este
caso el valor de retorno dependen del ABI, e.g. en amd64 los dos i32 que constituyen el punto son regresados en 2 registros (eax y edx).
language&>es-ES<&