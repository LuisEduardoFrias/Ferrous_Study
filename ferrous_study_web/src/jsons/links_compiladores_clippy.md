---
key: 79
name: links_compiladores_clippy
addData: 3/07/2025
updateData: null
keywords: 
 - links
 - compiladores clippy
 - modulos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Lints de compiladores y Clippy
El compilador de Rust crea mensajes de error muy buenos, así como lints integrados útiles. Clippy ofrece aún más lints, organizados en grupos que se pueden habilitar por proyecto.

```rust
#[deny(clippy::cast_possible_truncation)]
fn main() {
    let x = 3;
    while (x < 70000) {
        x *= 2;
    }
    println!("Es probable que X encaje en una u16, ¿no? {}", x as u16);
}
```

Ejecuta el código de ejemplo y analiza el mensaje de error. También se ven lints, pero no se mostrarán una vez que se compile el código. Ve al playground para ver los lints.

Después de resolver los lints, ejecuta clippy en el playground para mostrar advertencias de Clippy. Clippy cuenta con una amplia documentación sobre sus lints y añade otros nuevos continuamente (incluidos los de denegación de forma predeterminada).

Ten en cuenta que los errores o las advertencias con help: ... se pueden corregir con cargo fix o con el editor que uses.
language&>es-ES<&