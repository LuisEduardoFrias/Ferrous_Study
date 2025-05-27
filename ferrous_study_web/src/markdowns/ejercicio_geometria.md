---
key: 37
name: ejercicio_geometria
addData: 19/05/2025
updateData: null
keywords: 
 - ejercicio
 - geometria
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: geometría

Crearemos algunas funciones de utilidad para la geometría tridimensional representando un punto como [f64;3]. Debes decidir las firmas de las
funciones.

```rust
// Calcula la magnitud de un vector sumando los cuadrados de sus coordenadas
// y sacando la raíz cuadrada. Usa el método `sqrt()` para calcular la raíz cuadrada
//, como `v.sqrt()`.


fn magnitude(...) -> f64 {
    todo!()
}

// Normaliza un vector calculando su magnitud y dividiendo todas
// sus coordenadas entre esa magnitud.


fn normalize(...) {
    todo!()
}

// Usa `main` para comprobar lo que has hecho.

fn main() {
    println!("Magnitud de un vector unitario: {}", magnitude(&[0.0, 1.0, 0.0]));

    let mut v = [1.0, 2.0, 9.0];
    println!("Magnitud de {v:?}: {}", magnitude(&v));
    normalize(&mut v);
    println!("Magnitud de {v:?} después de la normalización: {}", magnitude(&v));
}
```
language&>es-ES<&