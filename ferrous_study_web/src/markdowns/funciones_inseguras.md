---
key: 94
name: funciones_inseguras
addData: 3/07/2025
updateData: null
keywords: 
 - funciones inseguras
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Funciones Inseguras (Unsafe)

## Llamar Funciones Unsafe (Inseguras)

Una función o método se puede marcar como unsafe si tiene condiciones previas adicionales que debes mantener para evitar un comportamiento indefinido:

```
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    let emojis = "🗻∈🌏";

    // SAFETY: The indices are in the correct order, within the bounds of the
    // string slice, and lie on UTF-8 sequence boundaries.
    unsafe {
        println!("emoji: {}", emojis.get_unchecked(0..4));
        println!("emoji: {}", emojis.get_unchecked(4..7));
        println!("emoji: {}", emojis.get_unchecked(7..11));
    }

    println!("recuento de caracteres: {}", count_chars(unsafe { emojis.get_unchecked(0..7) }));

    // SAFETY: `abs` doesn't deal with pointers and doesn't have any safety
    // requirements.
    unsafe {
        println!("Valor absoluto de -3 según C: {}", abs(-3));
    }

    // Si no se mantiene el requisito de codificación UTF-8, se verá afectada la seguridad de la memoria.
    // println!("emoji: {}", no seguro { emojis.get_unchecked(0..3) });
    // println!("recuento de caracteres: {}", count_chars(no seguro {
    // emojis.get_unchecked(0..3) }));
}

fn count_chars(s: &str) -> usize {
    s.chars().count()
}
```

## Escribir Funciones Unsafe (Inseguras)
Puedes marcar tus propias funciones como unsafe si requieren condiciones concretas para evitar un comportamiento indefinido.

```rust
/// Cambia los valores a los que apuntan los punteros proporcionados.
///
/// # Seguridad
///
/// Los punteros deben ser válidos y estar alineados adecuadamente.
unsafe fn swap(a: *mut u8, b: *mut u8) {
    let temp = *a;
    *a = *b;
    *b = temp;
}

fn main() {
    let mut a = 42;
    let mut b = 66;

    // SAFETY: ...
    unsafe {
        swap(&mut a, &mut b);
    }

    println!("a = {}, b = {}", a, b);
}
```

## Llamar Funciones Unsafe (Inseguras)
get_unchecked, like most _unchecked functions, is unsafe, because it can create UB if the range is incorrect. abs is incorrect for a different reason: it is an external function (FFI). Calling external functions is usually only a problem when those functions do things with pointers which might violate Rust’s memory model, but in general any C function might have undefined behaviour under any arbitrary circumstances.

En este ejemplo, "C" es la ABI.; también hay otras ABI disponibles.

## Escribir Funciones Unsafe (Inseguras)
We wouldn’t actually use pointers for a swap function - it can be done safely with references.

Note that unsafe code is allowed within an unsafe function without an unsafe block. We can prohibit this with #[deny(unsafe_op_in_unsafe_fn)]. Try adding it and see what happens. This will likely change in a future Rust edition.
language&>es-ES<&