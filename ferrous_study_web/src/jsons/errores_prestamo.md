---
key: 132
name: errores_prestamo
addData: 07/06/2025
updateData: null
keywords: 
 - errores de prestamo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Errores de Préstamo
Como un ejemplo concreto de como estas reglas de préstamo previenen errores de memoria, considera el caso de modificar una colección cuando existen referencias a sus elementos:

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];
    let elem = &vec[2];
    vec.push(6);
    println!("{elem}");
}
```

Considera este caso parecido de invalidación de iterador:

```rust
fn main() {
    let mut vec = vec![1, 2, 3, 4, 5];
    for elem in &vec {
        vec.push(elem * 2);
    }
}
```

En ambos casos, añadir elementos a la colección puede invalidar referencias pre-existentes a los elementos de la colección si es necesario realizar
reasignación.
language&>es-ES<&