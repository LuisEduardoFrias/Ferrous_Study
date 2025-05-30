---
key: 41
name: enums
addData: 26/05/2025
updateData: null
keywords: 
 - enums
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Enumeraciones

La palabra clave enum permite crear un tipo que tiene diferentes variantes:

```rust
#[derive(Debug)]
enum Direction {
    Left,
    Right,
}

#[derive(Debug)]
enum PlayerMove {
    Pass,                        // Variante simple
    Run(Direction),              // Variante de tupla
    Teleport { x: u32, y: u32 }, // Variante de struct
}

fn main() {
    let m: PlayerMove = PlayerMove::Run(Direction::Left);
    println!("En este turno: {:?}", m);
}
```

Puntos Clave:

Las enumeraciones te permiten colectar un conjunto de valores en un solo tipo.

Direction es un tipo con variantes. 
 - title&>Hay dos valores de Direction: 
 - Direction::Left
 - Direction::Right
 

PlayerMove es un tipo con tres variantes.
Además de las cargas útiles, Rust almacenará un discriminante para saber qué variante se encuentra en un valor PlayerMove en el tiempo de ejecución.

Este es un buen momento para comparar las estructuras y las enumeraciones:
En ambas puedes tener una versión sencilla sin campos (estructura unitaria) o una versión con distintos tipos de campos (variantes con carga útil).
Incluso podrías implementar las distintas variantes de una enumeración con estructuras diferentes, pero entonces no serían del mismo tipo como lo serían si estuvieran todas definidas en una enumeración.

Rust usa muy poco espacio para almacenar el discriminante.
Si es necesario, almacena un número entero del tamaño más pequeño requerido

Si los valores de la variante permitidos no cubren todos los patrones de bits, se utilizarán patrones de bits no válidos para codificar el discriminante (la “optimización de nicho”). Por ejemplo, Option<&u8> almacena un puntero en un número entero o NULL para la variante None.

Puedes controlar el discriminante si es necesario (por ejemplo, para asegurar la compatibilidad con C):

```rust
#[repr(u32)]
enum Bar {
    A, // 0
    B = 10000,
    C, // 10001
}

fn main() {
    println!("A: {}", Bar::A as u32);
    println!("B: {}", Bar::B as u32);
    println!("C: {}", Bar::C as u32);
}
```

Sin repr, el tipo discriminante ocupa 2 bytes, debido a que 10001 se cabe en 2 bytes.

Más información
Rust cuenta con varias optimizaciones que puede utilizar para hacer que las enums ocupen menos espacio.

Optimización de puntero nulo: para algunos tipos, Rust asegura que size_of::<T>() es igual a size_of::<Option<T> >().

Fragmento de código de ejemplo si quieres mostrar cómo puede ser la representación bit a bit en la práctica. Es importante tener en cuenta que el compilador no ofrece garantías con respecto a esta representación, por lo tanto es totalmente inseguro.

```rust
use std::mem::transmute;

macro_rules! dbg_bits {
    ($e:expr, $bit_type:ty) => {
        println!("- {}: {:#x}", stringify!($e), transmute::<_, $bit_type>($e));
    };
}

fn main() {
    unsafe {
        println!("bool:");
        dbg_bits!(false, u8);
        dbg_bits!(true, u8);

        println!("Option<bool>:");
        dbg_bits!(None::<bool>, u8);
        dbg_bits!(Some(false), u8);
        dbg_bits!(Some(true), u8);

        println!("Option<Option<bool>>:");
        dbg_bits!(Some(Some(false)), u8);
        dbg_bits!(Some(Some(true)), u8);
        dbg_bits!(Some(None::<bool>), u8);
        dbg_bits!(None::<Option<bool>>, u8);

        println!("Option<&i32>:");
        dbg_bits!(None::<&i32>, usize);
        dbg_bits!(Some(&0i32), usize);
    }
}
```

language&>es-ES<&