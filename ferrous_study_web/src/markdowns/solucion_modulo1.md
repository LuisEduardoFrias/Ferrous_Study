---
key: 24
name: solucion_modulo1
addData: 19/05/2025
updateData: null
keywords: 
 - solución
 - modulo1
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Soluciones

## Solución 1: Calculadora Simple

#### Requerimientos:
Crea un programa que realice operaciones aritméticas básicas (suma, resta, multiplicación, división) entre dos números enteros, usando funciones.

Define dos variables constantes para almacenar los dos números con los que vas a operar.

Realiza cada una de las cuatro operaciones e imprime el resultado de cada una utilizando inferencia de tipos cuando sea posible.

```rust
&title><title&
fn suma(n1: i32, n2: i32) {
    let resultado = n1 + n2;
    println!("La suma de {} y {} es: {}", n1, n2, resultado);
}

fn resta(n1: i32, n2: i32) {
    let resultado = n1 - n2;
    println!("La resta de {} y {} es: {}", n1, n2, resultado);
}

fn multiplicacion(n1: i32, n2: i32) {
    let resultado = n1 * n2;
    println!("La multiplicación de {} y {} es: {}", n1, n2, resultado);
}

fn division(n1: i32, n2: i32) {
    // Es importante manejar la división por cero para evitar errores en tiempo de ejecución.
    if n2 == 0 {
        println!("¡Error! No se puede dividir por cero.");
    } else {
        let resultado = n1 / n2;
        println!("La división de {} entre {} es: {}", n1, n2, resultado);
    }
}

fn main() {
    const NUMERO_UNO: i32 = 10;
    const NUMERO_DOS: i32 = 5;

    // Suma
    suma(NUMERO_UNO, NUMERO_DOS);

    // Resta
    resta(NUMERO_UNO, NUMERO_DOS);

    // Multiplicación
    multiplicacion(NUMERO_UNO, NUMERO_DOS);

    // División
    division(NUMERO_UNO, NUMERO_DOS);
}

```
<br />
<hr />
<br />

## Solución 2: Cálculo de Área de un Rectángulo

#### Requerimientos:
Define dos constantes llamadas BASE y ALTURA para representar las dimensiones de un rectángulo. Asigna valores numéricos enteros a ambas constantes.

Calcula el área del rectángulo multiplicando la BASE por la ALTURA y asigna el resultado a un variable area.

Imprime el valor del área del rectángulo utilizando **println!**. El mensaje debe incluir los valores de la base y la altura.

Define la función area_rectungular.

```rust
&title><title&
const BASE: i32 = 10;
const ALTURA: i32 = 5;

fn area_rectangular(base: i32, altura: i32) {
    let area = base * altura;
    println!("El área del rectángulo con base {} y altura {} es: {}", base, altura, area);
}

fn main() {
    area_rectangular(BASE, ALTURA);
}
```

<br />
<hr />
<br />

## Solución 3: Comparación de Constantes

#### Requerimientos:
Define dos constantes numéricas.

Completa la función verificar_rango para comparar estas dos constantes utilizando los operadores de comparación (>, <, ==, !=, >=, <=).

Para cada comparación, imprime un mensaje indicando si la condición es verdadera o falsa.

```rust
&title><title&
fn verificar_rango(numero: i32) {
    const NUMERO_SECRETO: i32 = 18;

    println!("{} > {}: {}", numero, NUMERO_SECRETO, numero > NUMERO_SECRETO);
    println!("{} < {}: {}", numero, NUMERO_SECRETO, numero < NUMERO_SECRETO);
    println!("{} == {}: {}", numero, NUMERO_SECRETO, numero == NUMERO_SECRETO);
    println!("{} != {}: {}", numero, NUMERO_SECRETO, numero != NUMERO_SECRETO);
    println!("{} >= {}: {}", numero, NUMERO_SECRETO, numero >= NUMERO_SECRETO);
    println!("{} <= {}: {}", numero, NUMERO_SECRETO, numero <= NUMERO_SECRETO);
}

fn main() {
   const LIMITE: i32 = 12;

    verificar_rango(LIMITE);
    verificar_rango(LIMITE);
    verificar_rango(LIMITE);
    verificar_rango(LIMITE);
}
```
language&>es-ES<&