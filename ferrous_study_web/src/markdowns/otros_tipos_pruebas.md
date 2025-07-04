---
key: 78
name: otros_tipos_pruebas
addData: 3/07/2025
updateData: null
keywords: 
 - pruebas
 - modulos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Otros tipos de pruebas
Pruebas de Integración
Si quieres probar tu biblioteca como cliente, haz una prueba de integración.

Crea un archivo .rs en tests/:

```rust
title&>tests/my_library.rs<&title
use my_library::init;

#[test]
fn test_init() {
    assert!(init().is_ok());
}
```

Estas pruebas solo tienen acceso a la API pública de tu crate.

Pruebas de Documentación
Rust cuenta con asistencia integrada para pruebas de documentación:

```rust
/// Acorta una cadena según la longitud proporcionada.
///
/// ```
/// # use playground::shorten_string;
/// assert_eq!(shorten_string("Hola, mundo", 5), "Hola");
/// assert_eq!(shorten_string("Hola, mundo", 20), "Hola, mundo");
/// ```
pub fn shorten_string(s: &str, length: usize) -> &str {
    &s[..std::cmp::min(length, s.len())]
}
```

Los bloques de código en los comentarios /// se ven automáticamente como código de Rust.
El código se compilará y ejecutará como parte de cargo test.
Si añades # al código, se ocultará de los documentos, pero se seguirá compilando o ejecutando.
Prueba el código anterior en el playground de Rust.

language&>es-ES<&