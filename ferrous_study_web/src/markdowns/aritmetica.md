---
key: 9
name: aritmetica
addData: 19/05/2025
updateData: null
keywords: 
 - aritmética
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Aritmética en Rust

En Rust, al igual que en la mayoría de los lenguajes de programación, la aritmética juega un papel fundamental. Las operaciones básicas como la suma, resta, multiplicación y división están disponibles de forma intuitiva. Además, Rust ofrece un control preciso sobre cómo se manejan los tipos numéricos y sus posibles <mark>&title>desbordamientos<title&En un lenguaje de programación, el desbordamiento (overflow) ocurre cuando el resultado de una operación aritmética o cálculo supera el rango máximo que puede representar el tipo de dato que se está utilizando. Esto puede resultar en datos incorrectos o incluso errores en el programa.</mark>, lo que lo convierte en un lenguaje robusto para cálculos.

Operaciones Aritméticas Básicas
Los operadores aritméticos binarios comunes en Rust son:
 * Suma: + (ejemplo: a + b)
 * Resta: - (ejemplo: a - b)
 * Multiplicación: * (ejemplo: a * b)
 * División: / (ejemplo: a / b)
 * Resto (Módulo): % (ejemplo: a % b)

Estos operadores funcionan de manera similar a como lo hacen en matemáticas y en otros lenguajes de programación. La precedencia de los operadores también se mantiene (por ejemplo, la multiplicación y la división se realizan antes que la suma y la resta). Puedes utilizar paréntesis () para alterar el orden de las operaciones.

Ejemplo Práctico: La Función interproduct

```rust
fn interproduct(a: i32, b: i32, c: i32) -> i32 {
    return a * b + b * c + c * a;
}

fn main() {
    println!("resultado: {}", interproduct(120, 100, 248));
    //resultado: 66560
}
```

La función interproduct toma tres enteros de 32 bits con signo (i32) como entrada y devuelve un único entero de 32 bits con signo. La función calcula la suma de los productos de cada par posible de los tres números. La función main es el punto de entrada de todo programa en Rust, y en este caso, llama a interproduct con los valores 120, 100 y 248, imprimiendo el resultado en la consola.

El Crucial Tema del Desbordamiento de Enteros

Aquí es donde Rust se distingue significativamente. En lenguajes como C y C++, el comportamiento ante el desbordamiento de enteros con signo es indefinido. Esto significa que el resultado podría variar dependiendo de la arquitectura del procesador, el compilador y las opciones de compilación, lo que puede llevar a errores sutiles y difíciles de depurar.

Rust, por otro lado, define explícitamente el comportamiento del desbordamiento de enteros.

Cuando se compila en modo de <mark>&title>depuración<title&La configuración predeterminada al usar cargo run.</mark>, Rust detecta el desbordamiento de enteros y causa un <mark>&title>pánico<title&Una terminación abrupta del programa con un mensaje de error.</mark>. Esto es extremadamente útil durante el desarrollo, ya que te alerta inmediatamente sobre posibles problemas aritméticos.

Sin embargo, al compilar en modo de <mark>&title>lanzamiento<title&Usando cargo build --release</mark>, el comportamiento cambia para optimizar el rendimiento. En este modo, Rust realiza un "wrapping" (envoltura) del valor en caso de desbordamiento. Imagina un contador que, al alcanzar su máximo valor, vuelve a empezar desde el mínimo. Por ejemplo, si un i8 (entero de 8 bits con signo) tiene un valor máximo de 127 y le sumas 1, en modo de lanzamiento el resultado sería -128.

Opciones para un Control Preciso del Desbordamiento

Rust va más allá del simple pánico o envoltura, ofreciendo mecanismos para controlar explícitamente cómo se deben manejar las operaciones que podrían desbordarse. Esto se logra a través de métodos disponibles en los tipos numéricos:
 * wrapping_*: Realiza la operación con envoltura explícita. Por ejemplo, a.wrapping_add(b).
 * saturating_*: Realiza la operación y, en caso de desbordamiento, el resultado se "satura" en el valor máximo o mínimo representable para el tipo. Por ejemplo, (a * b).saturating_add(b * c).saturating_add(c * a). Si el resultado de la suma fuera mayor que el máximo i32, el resultado sería simplemente el máximo i32.
 * overflowing_*: Realiza la operación y devuelve una tupla que contiene el resultado y un booleano indicando si hubo desbordamiento. Por ejemplo, let (resultado, hubo_desbordamiento) = a.overflowing_mul(b);.
 * checked_*: Realiza la operación y devuelve un Option. Si no hay desbordamiento, devuelve Some(resultado); si hay desbordamiento, devuelve None. Esto obliga al programador a manejar explícitamente el caso de desbordamiento. Por ejemplo, let resultado_opcional = a.checked_sub(b);.

Estos métodos proporcionan una gran flexibilidad para manejar situaciones donde el desbordamiento podría ser un problema, permitiéndote elegir el comportamiento más adecuado para tu aplicación.

La aritmética en Rust es robusta y segura gracias a su manejo explícito del desbordamiento de enteros. Ya sea que necesites operaciones básicas o un control más fino sobre cómo se gestionan los límites numéricos, Rust te proporciona las herramientas necesarias para escribir código confiable y eficiente. La distinción entre el comportamiento en modo de depuración y lanzamiento, junto con los métodos para un manejo explícito del desbordamiento, hacen de Rust una excelente opción para aplicaciones que requieren precisión y seguridad en los cálculos numéricos.
language&>es-ES<&