---
key: 25
name: funciones
addData: 19/05/2025
updateData: null
keywords: 
 - funciones
 - sobrecarga
 - genéricos
 - return
languages:
 - key: Español
   value:es-ES
 - key: English
   value: en-En
---
language&>es-Es<&
### Funciones en Rust: Bloques de Código Reutilizables

Las funciones son bloques fundamentales de código que realizan una tarea específica. En Rust, se definen utilizando la palabra clave `fn`, seguida del nombre de la función, sus parámetros (si los tiene) y el tipo de valor que retorna (si lo hace).

### Definición de una Función

La sintaxis general para definir una función en Rust es la siguiente:

```rust

fn nombre_de_la_funcion(parametro1: Tipo1, parametro2: Tipo2, ...) -> TipoRetorno {
    // Cuerpo de la función: código que se ejecuta
    // ...
    valor_de_retorno // Si la función retorna un valor
}
```

Analicemos cada parte:

* `fn`: Palabra clave que indica la definición de una función.
* `nombre_de_la_funcion`: Un identificador que le das a tu función. Sigue las convenciones de nomenclatura de Rust (snake_case).
* `(parametro1: Tipo1, parametro2: Tipo2, ...)`: La lista de parámetros que la función recibe. Cada parámetro tiene un nombre y un tipo especificado con `:`. Si la función no recibe ningún parámetro, los paréntesis estarán vacíos `()`.
* `-> TipoRetorno`: Indica el tipo de valor que la función retorna. Si la función no retorna ningún valor, se omite o se especifica el "tipo unitario" `()`.
* `{ ... }`: El bloque de código que contiene las instrucciones que la función ejecuta.

<br />

### Ejemplo Básico: Una Función que Suma Dos Números

Veamos un ejemplo sencillo de una función que toma dos números enteros de 32 bits sin signo (`u32`) y devuelve su suma, también como `u32`:

```rust
&title>Función para sumar dos números<title&
fn sumar(a: u32, b: u32) -> u32 {
    let resultado = a + b;
    resultado // La última expresión es el valor de retorno
}

fn main() {
    let numero1 = 10;
    let numero2 = 5;
    let suma_total = sumar(numero1, numero2);
    println!("La suma de {} y {} es: {}", numero1, numero2, suma_total);
}
```

En este ejemplo:

* Definimos una función llamada `sumar` que toma dos parámetros, `a` y `b`, ambos de tipo `u32`.
* La función está definida para retornar un valor de tipo `u32` (`-> u32`).
* Dentro del cuerpo de la función, calculamos la suma de `a` y `b` y la almacenamos en la variable `resultado`.
* La última línea del cuerpo de la función es `resultado`. En Rust, si no se usa la palabra clave `return`, la última expresión de un <mark>&title>bloque<title& Como el cuerpo de una función</mark> se convierte automáticamente en el valor de retorno.
* En la función `main`, llamamos a la función `sumar` con los argumentos `10` y `5`, y el valor retornado se asigna a la variable `suma_total`, que luego se imprime.

<br />

### Retorno Implícito vs. `return` Explícito

Como se mencionó, Rust permite un retorno implícito donde la última expresión de la función es el valor retornado. También puedes usar la palabra clave `return` explícitamente para devolver un valor en cualquier punto de la función.

```rust
&title>Función con retorno explícito<title&
fn es_mayor_que_diez(numero: i32) -> bool {
    if numero > 10 {
        return true; // Retorno explícito si la condición es verdadera
    }
    false // Retorno implícito si la condición es falsa
}

fn main() {
    println!("¿Es 15 mayor que 10? {}", es_mayor_que_diez(15));
    println!("¿Es 5 mayor que 10? {}", es_mayor_que_diez(5));
}
```

Ambos estilos son válidos, pero el retorno implícito al final de la función es considerado más idiomático en Rust para casos sencillos.

### Funciones sin Valor de Retorno

Algunas funciones realizan acciones pero no necesitan devolver un valor específico. En estos casos, el tipo de retorno es el "tipo unitario" `()`, que a menudo se omite en la declaración.

```rust
&title>Función sin valor de retorno<title&
fn saludar(nombre: &str) {
    println!("¡Hola, {}!", nombre);
}

fn main() {
    saludar("Carlos");
}
```

En este ejemplo, la función `saludar` toma una referencia a un string (`&str`) como parámetro y simplemente imprime un saludo. No hay una instrucción `return` y no se especifica un tipo de retorno explícitamente, lo que significa que implícitamente retorna `()`.

### Características Importantes de las Funciones en Rust

* **Parámetros con Tipo:** Siempre debes especificar el tipo de cada parámetro en la declaración de la función.
* **Tipo de Retorno:** Es obligatorio especificar el tipo de valor que la función retorna (a menos que sea `()`).
* **Sobrecarga No Existente:** Rust no admite la <mark>&title>sobrecarga<title&C++ permite especificar más de una función con el mismo nombre en el mismo ámbito. Estas funciones se denominan funciones sobrecargadas o sobrecargas. </mark> de funciones. Cada función debe tener un nombre único dentro de su ámbito.
* **Número Fijo de Parámetros:** Las funciones en Rust siempre toman un número fijo de parámetros definidos en su declaración.
* **Sin Argumentos Predeterminados:** Rust no tiene soporte para argumentos con valores predeterminados. Puedes lograr una funcionalidad similar utilizando patrones o múltiples funciones con diferentes parámetros.
* **Tipos Genéricos:** Aunque no se muestra en este ejemplo básico, las funciones en Rust pueden ser genéricas, lo que les permite trabajar con múltiples tipos sin necesidad de escribir implementaciones separadas para cada uno.

<br />
<hr />
<br />

Las funciones son bloques de construcción esenciales en Rust que te permiten organizar y reutilizar tu código de manera eficiente. Comprender cómo definirlas, pasarles parámetros y manejar los valores de retorno es fundamental para escribir programas en Rust.
language&>es-Es<&
language&>en-En<&
## Functions in Rust: Reusable Code Blocks
Functions are fundamental blocks of code that perform a specific task. In Rust, they are defined using the keyword fn, followed by the function's name, its parameters (if it has them) and the type of value it returns (if it does).

### Defining a Function
The general syntax for defining a function in Rust is as follows:

```rust
fn nombre_de_la_funcion(parametro1: Tipo1, parametro2: Tipo2, ...) -> TipoRetorno {
    // Cuerpo de la función: código que se ejecuta
    // ...
    valor_de_retorno // Si la función retorna un valor
}
```

Let's analyze each part:
 * fn: Keyword that indicates the definition of a function.
 * nombre_de_la_funcion: An identifier you give to your function. It follows Rust's naming conventions (snake_case).
 * (parametro1: Tipo1, parametro2: Tipo2, ...): The list of parameters the function receives. Each parameter has a name and a type specified with :. If the function does not receive any parameters, the parentheses will be empty ().
 * -> TipoRetorno: Indicates the type of value the function returns. If the function does not return any value, it is omitted or the "unit type" () is specified.
 * { ... }: The code block that contains the instructions that the function executes.

<br />

Basic Example: A Function that Sums Two Numbers
Let's look at a simple example of a function that takes two unsigned 32-bit integers (u32) and returns their sum, also as u32:

```rust
&title>Función para sumar dos números<title&
fn sumar(a: u32, b: u32) -> u32 {
    let resultado = a + b;
    resultado // La última expresión es el valor de retorno
}

fn main() {
    let numero1 = 10;
    let numero2 = 5;
    let suma_total = sumar(numero1, numero2);
    println!("La suma de {} y {} es: {}", numero1, numero2, suma_total);
}
```

In this example:
 * We define a function called sumar that takes two parameters, a and b, both of type u32.
 * The function is defined to return a value of type u32 (-> u32).
 * Inside the function body, we calculate the sum of a and b and store it in the resultado variable.
 * The last line of the function body is resultado. In Rust, if the keyword return is not used, the last expression of a <mark>&title>bloque<title& Como el cuerpo de una función</mark> automatically becomes the return value.
 * In the main function, we call the sumar function with the arguments 10 and 5, and the returned value is assigned to the suma_total variable, which is then printed.

<br />

Implicit Return vs. return Explicit
As mentioned, Rust allows an implicit return where the last expression of the function is the returned value. You can also use the keyword return explicitly to return a value at any point in the function.

```rust
&title>Función con retorno explícito<title&
fn es_mayor_que_diez(numero: i32) -> bool {
    if numero > 10 {
        return true; // Retorno explícito si la condición es verdadera
    }
    false // Retorno implícito si la condición es falsa
}

fn main() {
    println!("¿Es 15 mayor que 10? {}", es_mayor_que_diez(15));
    println!("¿Es 5 mayor que 10? {}", es_mayor_que_diez(5));
}
```

Both styles are valid, but the implicit return at the end of the function is considered more idiomatic in Rust for simple cases.
Functions without a Return Value
Some functions perform actions but do not need to return a specific value. In these cases, the return type is the "unit type" (), which is often omitted in the declaration.

```rust
&title>Función sin valor de retorno<title&
fn saludar(nombre: &str) {
    println!("¡Hola, {}!", nombre);
}

fn main() {
    saludar("Carlos");
}
```

In this example, the function saludar takes a reference to a string (&str) as a parameter and simply prints a greeting. There is no return instruction and no return type is explicitly specified, which means it implicitly returns ().
Important Characteristics of Functions in Rust
 * Parameters with Type: You must always specify the type of each parameter in the function declaration.
 * Return Type: It is mandatory to specify the type of value the function returns (unless it is ()).
 * No Overloading: Rust does not support function <mark>&title>sobrecarga<title&C++ permite especificar más de una función con el mismo nombre en el mismo ámbito. Estas funciones se denominan funciones sobrecargadas o sobrecargas. </mark> of functions. Each function must have a unique name within its scope.
 * Fixed Number of Parameters: Functions in Rust always take a fixed number of parameters defined in their declaration.
 * No Default Arguments: Rust has no support for arguments with default values. You can achieve similar functionality using patterns or multiple functions with different parameters.
 * Generic Types: Although not shown in this basic example, functions in Rust can be generic, which allows them to work with multiple types without needing to write separate implementations for each.

<br />
<hr />
<br />

Functions are essential building blocks in Rust that allow you to organize and reuse your code efficiently. Understanding how to define them, pass parameters to them, and handle return values is fundamental to writing programs in Rust.

language&>en-En<&
