---
key: 121
name: tipos_copy
addData: 07/06/2025
updateData: null
keywords: 
 - creacional
 - fábrica
 - familia de objetos
 - interfaces
 - acoplamiento bajo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Tipos Copy
Aunque la semántica de movimiento es la opción predeterminada, algunos tipos se copian de forma predeterminada:

```rust
fn main() {
    let x = 42;
    let y = x;
    println!("x: {x}"); // would not be accessible if not Copy
    println!("y: {y}");
}
```

Estos tipos implementan el trait Copy.

Puedes habilitar tus propios tipos para que usen la semántica de copia:

```rust
#[derive(Copy, Clone, Debug)]
struct Point(i32, i32);

fn main() {
    let p1 = Point(3, 4);
    let p2 = p1;
    println!("p1: {p1:?}");
    println!("p2: {p2:?}");
}
```

Después de la asignación, tanto p1 como p2 tienen sus propios datos.
También podemos utilizar p1.clone() para copiar los datos de forma explícita.


Copiar y clonar no es lo mismo:

Copiar hace referencia a las copias bit a bit de regiones de memoria y no funciona en cualquier objeto.
Copiar no permite lógica personalizada (a diferencia de los constructores de copias de C++).
Clonar es una operación más general y que permite un comportamiento personalizado implementando el trait Clone.
Copiar no funciona en los tipos que implementan el trait Drop.
En el ejemplo anterior, prueba lo siguiente:

Añade un campo String a struct Point. No se compilará porque String no es de tipo Copy.
Elimina Copy del atributo derive. El error del compilador se encuentra ahora en println! para p1.
Demuestra que funciona si clonas p1.
Más información
Referencias compartidas son Copy/Clone, pero referencias mutables no lo son. Esto es porque Rust requiere que las referencias mutables sean
exclusivas. Esto significa que es valido hacer una copia de una referencia compartida, pero hacer lo mismo para una referencia mutable violaría las
reglas de préstamo de Rust.
language&>es-ES<&