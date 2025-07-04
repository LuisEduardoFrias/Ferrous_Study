---
key: 80
name: ejercicio_algoritmo_luhn
addData: 3/07/2025
updateData: null
keywords: 
 - ejercicio
 - algoritmo luhn
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: Algoritmo de Luhn
Algoritmo de Luhn
El algoritmo de Luhn se usa para validar números de tarjetas de crédito. El algoritmo toma una cadena como entrada y hace lo siguiente para validar el número de la tarjeta de crédito:

Ignora todos los espacios. Rechaza los números con menos de dos dígitos.

De derecha a izquierda, duplica cada dos cifras: en el caso del número 1234, se duplica el 3 y el 1. En el caso del número 98765, se duplica el 6 y el 8.

Después de duplicar un dígito, se suman los dígitos si el resultado es mayor a 9. Por tanto, si duplicas 7, pasará a ser 14, lo cual pasará a ser 1 +4 = 5.

Suma todos los dígitos, no duplicados y duplicados.

El número de la tarjeta de crédito es válido si la suma termina en 0.

El código proporcionado ofrece una implementación errónea del algoritmo de Luhn, junto con dos pruebas unitarias básicas que confirman que la mayor parte del algoritmo se ha implementado correctamente.

Copia el fragmento de código que aparece más abajo en la página a https://play.rust-lang.org/ y escribe pruebas adicionales para descubrir y arreglar errores en la implementación proveída.

```rust
pub fn luhn(cc_number: &str) -> bool {
    let mut sum = 0;
    let mut double = false;

    for c in cc_number.chars().rev() {
        if let Some(digit) = c.to_digit(10) {
            if double {
                let double_digit = digit * 2;
                sum +=
                    if double_digit > 9 { double_digit - 9 } else { double_digit };
            } else {
                sum += digit;
            }
            double = !double;
        } else {
            continue;
        }
    }

    sum % 10 == 0
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_valid_cc_number() {
        assert!(luhn("4263 9826 4026 9299"));
        assert!(luhn("4539 3195 0343 6467"));
        assert!(luhn("7992 7398 713"));
    }

    #[test]
    fn test_invalid_cc_number() {
        assert!(!luhn("4223 9826 4026 9299"));
        assert!(!luhn("4539 3195 0343 6476"));
        assert!(!luhn("8273 1232 7352 0569"));
    }
}
```
language&>es-ES<&