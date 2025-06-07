---
key: 113
name: ejercicio_rot13_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - ejercicio
 - rot13
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Ejercicio: ROT13
En este ejemplo, implementaremos el algoritmo de cifrado clásico “ROT13”. Copia este código en el playground e implementa los bits que faltan. Rota únicamente los caracteres alfabéticos ASCII para asegurarte de que el resultado sigue siendo válido en UTF-8.

```rust
use std::io::Read;

struct RotDecoder<R: Read> {
    input: R,
    rot: u8,
}

// Implementa el trait `Read` para `RotDecoder`.

fn main() {
    let mut rot =
        RotDecoder { input: "Gb trg gb gur bgure fvqr!".as_bytes(), rot: 13 };
    let mut result = String::new();
    rot.read_to_string(&mut result).unwrap();
    println!("{}", result);
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn joke() {
        let mut rot =
            RotDecoder { input: "Gb trg gb gur bgure fvqr!".as_bytes(), rot: 13 };
        let mut result = String::new();
        rot.read_to_string(&mut result).unwrap();
        assert_eq!(&result, "To get to the other side!");
    }

    #[test]
    fn binary() {
        let input: Vec<u8> = (0..=255u8).collect();
        let mut rot = RotDecoder::<&[u8]> { input: input.as_ref(), rot: 13 };
        let mut buf = [0u8; 256];
        assert_eq!(rot.read(&mut buf).unwrap(), 256);
        for i in 0..=255 {
            if input[i] != buf[i] {
                assert!(input[i].is_ascii_alphabetic());
                assert!(buf[i].is_ascii_alphabetic());
            }
        }
    }
}
```

¿Qué ocurre si encadenas dos instancias RotDecoder y cada una de ellas rota 13 posiciones?
language&>es-ES<&