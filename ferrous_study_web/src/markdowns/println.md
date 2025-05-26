---
key: 30
name: println
addData: 19/05/2025
updateData: null
keywords: 
 - println
 - macro
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Introducción a la macro `println!` en Rust

La macro `println!` es una de las herramientas más fundamentales en Rust para mostrar información en la consola (la salida estándar), generalmente añade un salto de línea al final de la salida.

### Sintaxis básica

La forma más sencilla de usar `println!` es pasarle una cadena literal como argumento:

```rust
fn main() {
    println!("¡Hola, mundo!");
}

/*
Al ejecutar este código, verás la siguiente salida en tu consola:
¡Hola, mundo!
*/
```

### Interpolación de variables
Una de las características más útiles de println! es su capacidad para interpolar valores de variables dentro de la cadena de texto. Esto se hace utilizando marcadores de posición {} dentro de la cadena, y luego pasando las variables correspondientes como argumentos adicionales a la macro.

```rust
fn main() {
    let nombre = "Alicia";
    let edad = 30;
    println!("Mi nombre es {} y tengo {} años.", nombre, edad);
}

/*
La salida de este código sería:
Mi nombre es Alicia y tengo 30 años.
*/
```

Observa cómo los marcadores {} se reemplazan en orden con los valores de las variables nombre y edad.

### Especificadores de formato

Para tener un control más preciso sobre cómo se muestran los valores, println! admite varios especificadores de formato dentro de los marcadores {}. Algunos de los más comunes son:
 * {}: Formato por defecto para el tipo de dato.
 * {:?}: Formato de depuración (útil para ver la estructura de los datos).
 * {:x} o {:X}: Formato hexadecimal (en minúsculas o mayúsculas).
 * {:b}: Formato binario.
 * :.2: Formato para números de punto flotante con 2 decimales.

Aquí tienes algunos ejemplos:

```rust
fn main() {
    let pi = 3.14159;
    let numero = 255;

    println!("El valor de pi es aproximadamente {:.2}", pi);
    println!("255 en hexadecimal es {:X}", numero);
    println!("255 en binario es {:b}", numero);
    println!("Formato de depuración para un rango: {:?}", 1..5);
}

/*
La salida de este código sería:
El valor de pi es aproximadamente 3.14
255 en hexadecimal es FF
255 en binario es 11111111
Formato de depuración para un rango: 1..5
*/
```

Múltiples argumentos
Puedes pasar múltiples variables a println! para insertarlas en la cadena de formato. Asegúrate de que haya suficientes marcadores {} en la cadena para todos los argumentos proporcionados.

```rust
fn main() {
    let x = 10;
    let y = 20;
    let suma = x + y;
    println!("La suma de {} y {} es {}", x, y, suma);
}

/*
Salida:
La suma de 10 y 20 es 30
*/
```

La macro println! es una herramienta esencial para mostrar información en Rust. Con su sintaxis básica y la capacidad de interpolar variables con varios especificadores de formato, te permite comunicar de manera efectiva los resultados y el estado de tu programa.
language&>es-ES<&