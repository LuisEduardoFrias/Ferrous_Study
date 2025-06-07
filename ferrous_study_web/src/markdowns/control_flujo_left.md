---
key: 80
name: control_flujo_left
addData: 06/06/2025
updateData: null
keywords: 
 - control de flujo
 - left
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Control de Flujo Let
Rust tiene algunas construcciones de control de flujo que difieren de otros lenguajes. Se utilizan para el patrón de coincidencia:

Expresiones if let
Expresiones let else
Expresiones while let

Expresiones if let
La [expresión if let][(https://doc.rust-lang.org/reference/expressions/if-expr.html#if-let-expressions) te permite ejecutar código diferente en función de si un valor coincide con un patrón:

```rust
use std::time::Duration;

fn sleep_for(secs: f32) {
    if let Ok(dur) = Duration::try_from_secs_f32(secs) {
        std::thread::sleep(dur);
        println!("Horas de sueño: {:?}", dur);
    }
}

fn main() {
    sleep_for(-10.0);
    sleep_for(0.8);
}
```

Expresiones let else
En el caso habitual de coincidencia con un patrón y retorno de la función, utiliza let else. El caso “else” debe divergir (return, break o pánico; cualquier acción es válida menos colocarlo al final del bloque).

```rust
fn hex_or_die_trying(maybe_string: Option<String>) -> Result<u32, String> {
    let s = if let Some(s) = maybe_string {
        s
    } else {
        return Err(String::from("se ha obtenido None"));
    };

    let first_byte_char = if let Some(first_byte_char) = s.chars().next() {
        first_byte_char
    } else {
        return Err(String::from("se ha encontrado una cadena vacía"));
    };

    if let Some(digit) = first_byte_char.to_digit(16) {
        Ok(digit)
    } else {
        Err(String::from("no es un dígito hexadecimal"))
    }
}

fn main() {
    println!("resultado: {:?}", hex_or_die_trying(Some(String::from("foo"))));
}
```

Al igual que con if let, hay una variante while let que prueba repetidamente un valor con respecto a un patrón:

```rust
fn main() {
    let mut name = String::from("Comprehensive Rust 🦀");
    while let Some(c) = name.pop() {
        println!("character: {c}");
    }
    // (There are more efficient ways to reverse a string!)
}
```

Aquí, String::pop devolverá Some(c) hasta que la cadena este vacía, cuando empezara a devolver None. while let nos permite seguir iterando a través de todos los elementos.

if-let
A diferencia de match, if let no tiene que cubrir todas las ramas, pudiendo así conseguir que sea más conciso que match.
Un uso habitual consiste en gestionar valores Some al trabajar con Option.
A diferencia de match, if let no admite cláusulas guardia para la coincidencia de patrones.
let-else
Las instrucciones if-let se pueden apilar, tal y como se muestra. La construcción let-else permite aplanar este código anidado. Reescribe esta rara versión para que los participantes puedan ver la transformación.

La versión reescrita es la siguiente:

```rust
fn hex_or_die_trying(maybe_string: Option<String>) -> Result<u32, String> {
    let Some(s) = maybe_string else {
        return Err(String::from("se ha obtenido None"));
    };

    let Some(first_byte_char) = s.chars().next() else {
        return Err(String::from("se ha encontrado una cadena vacía"));
    };

    let Some(digit) = first_byte_char.to_digit(16) else {
        return Err(String::from("no es un dígito hexadecimal"));
    };

    return Ok(digit);
}
```

while-let
Señala que el bucle while let seguirá funcionando siempre que el valor coincida con el patrón.
Puedes reescribir el bucle while let como un ciclo infinito con una instrucción if que rompe el bucle si name.pop() no devuelve un valor para
desenvolver. while let proporciona azúcar sintáctico para la situación anterior.

language&>es-ES<&