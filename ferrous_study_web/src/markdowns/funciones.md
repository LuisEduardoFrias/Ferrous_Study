## Funciones en Rust: Bloques de Código Reutilizables

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
