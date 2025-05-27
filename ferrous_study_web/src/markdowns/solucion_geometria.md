---
key: 38
name: solucion_geometria
addData: 19/05/2025
updateData: null
keywords: 
 - solución
 - geometria
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Solición

```rust
/// Calcula la magnitud del vector dado.
fn magnitude(vector: &[f64; 3]) -> f64 {
    let mut mag_squared = 0.0;
    for coord in vector {
        mag_squared += coord * coord;
    }
    mag_squared.sqrt()
}

/// Cambia la magnitud del vector a 1.0 sin cambiar su dirección.
fn normalize(vector: &mut [f64; 3]) {
    let mag = magnitude(vector);
    for item in vector {
        *item /= mag;
    }
}

fn main() {
    println!("Magnitud de un vector unitario: {}", magnitude(&[0.0, 1.0, 0.0]));

    let mut v = [1.0, 2.0, 9.0];
    println!("Magnitud de {v:?}: {}", magnitude(&v));
    normalize(&mut v);
    println!("Magnitud de {v:?} después de la normalización: {}", magnitude(&v));
}
```
language&>es-ES<&