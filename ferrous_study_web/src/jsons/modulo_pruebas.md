---
key: 77
name: modulo_pruebas
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
# Pruebas Unitarias
Rust y Cargo incluyen un sencillo framework para pruebas unitarias:

Las pruebas unitarias se admiten en todo el código.

Las pruebas de integración se admiten a través del directorio tests/.

Las pruebas se marcan con #[test]. Las pruebas unitarias se suelen incluir en un módulo tests anidado en el que se utiliza #[cfg(test)] para compilarlas únicamente cuando se compilan las pruebas.

```rust
&mn>notplay
fn first_word(text: &str) -> &str {
    match text.find(' ') {
        Some(idx) => &text[..idx],
        None => &text,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty() {
        assert_eq!(first_word(""), "");
    }

    #[test]
    fn test_single_word() {
        assert_eq!(first_word("Hola"), "Hola");
    }

    #[test]
    fn test_multiple_words() {
        assert_eq!(first_word("Hola, mundo"), "Hola");
    }
}
```

Esto permite realizar pruebas unitarias de los ayudantes privados.
El atributo #[cfg(test)] solo está activo cuando se ejecuta cargo test.

Haz las pruebas en el playground para ver los resultados.
language&>es-ES<&