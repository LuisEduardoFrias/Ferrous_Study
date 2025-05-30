---
key: 20
name: tuplas
addData: 19/05/2025
updateData: null
keywords: 
 - tuplas
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Tuplas

<br/>
```rust
fn main() {
    let t: (i8, bool) = (7, true);
    println!("t.0: {}", t.0);
    println!("t.1: {}", t.1);
}
```

This slide should take about 5 minutes.
Al igual que los arrays, las tuplas tienen una longitud fija.

Las tuplas agrupan valores de diferentes tipos en un tipo compuesto.

Se puede acceder a los campos de una tupla por el punto y el índice del valor, por ejemplo, t.0, t.1.

La tupla vacía () es llamado el “tipo de unidad” y significa la ausencia de un valor de retorno, parecido a void en otros lenguajes.
language&>es-ES<&