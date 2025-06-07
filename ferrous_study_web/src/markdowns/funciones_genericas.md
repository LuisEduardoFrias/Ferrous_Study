---
key: 91
name: funciones_genericas
addData: 06/06/2025
updateData: null
keywords: 
 - funciones
 - genericos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Funciones genéricas
Rust admite el uso de genéricos, lo que permite abstraer los algoritmos o las estructuras de datos (como el ordenamiento o un árbol binario) sobre los tipos utilizados o almacenados.

```rust
/// Elige `even` u `odd` en función de si `n` es par o impar.
fn pick<T>(n: i32, even: T, odd: T) -> T {
    if n % 2 == 0 {
        even
    } else {
        odd
    }
}

fn main() {
    println!("número elegido: {:?}", pick(97, 222, 333));
    println!("tupla elegida: {:?}", pick(28, ("perro", 1), ("gato", 2)));
}
```

Rust infiere un tipo para T en función de los tipos de los argumentos y del valor devuelto.

Es similar a las plantillas de C++, pero Rust compila de forma parcial la función genérica de forma inmediata, por lo que debe ser válida para todos los tipos que coincidan con las restricciones. Por ejemplo, prueba a modificar pick para que devuelva even + odd si n == 0. Aunque solo se use la instanciación pick con números enteros, Rust seguirá considerando que no es válida. En cambio, C++ lo permitiría.

Código genérico es convertido en código no genérico basada en los sitios de ejecución .Se trata de una abstracción sin coste: se obtiene exactamente
el mismo resultado que si se hubiesen programado de forma manual las estructuras de datos sin la abstracción.
language&>es-ES<&