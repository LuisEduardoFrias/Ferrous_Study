---
key: 86
name: tipos_asociados
addData: 06/06/2025
updateData: null
keywords: 
 - tipos asociados
 - tipos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Tipos de datos asociados
Tipos asociados son tipos guarda-espacio que han sido proveídos por la implementación del trait.

```rust
#[derive(Debug)]
struct Meters(i32);
#[derive(Debug)]
struct MetersSquared(i32);

trait Multiply {
    type Output;
    fn multiply(&self, other: &Self) -> Self::Output;
}

impl Multiply for Meters {
    type Output = MetersSquared;
    fn multiply(&self, other: &Self) -> Self::Output {
        MetersSquared(self.0 * other.0)
    }
}

fn main() {
    println!("{:?}", Meters(10).multiply(&Meters(20)));
}
```

Tipos asociados también son llamados “tipos de salida”. La observación clave es que el implementador, no el ejecutor, escoge este tipo.

Muchos traits de la biblioteca estándar tienen tipos asociados, incluyendo operadores aritméticos y Iterator.
language&>es-ES<&