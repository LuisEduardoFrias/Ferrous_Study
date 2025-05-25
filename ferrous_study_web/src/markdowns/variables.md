---
key: 7
name: variables
addData: 19/05/2025
updateData: null
keywords: 
 - variables
 - constantes
 - static
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
## Identificadores

Un identificador es el nombre que se le da a una entidad dentro del código fuente, como una variable, una constante, una función, una clase, etc. Su propósito principal es permitirnos referirnos a esa entidad de una manera única y fácil de recordar dentro de nuestro programa.

### Variables

Rust las variables se definen con la palabra clave **let**:

```rust
fn main() {
    //Rust ofrece seguridad de tipos mediante tipado estático.
    let x: i32 = 10;
    println!("x: {x}");  // x: 10;
}
```
Rust también proporciona inferencia de tipos.
- Prueba remover el tapado del ejemplo: let x = 10;

Las variables son inmutables de forma predeterminada.
- Añade '**x = 20**' para demostrarlo. 
- Añade la palabra clave **mut** para que se puedan hacer cambios: let mut x = 10;

En este ejemplo #1, i32 es el tipo de la variable. Se debe conocer durante el tiempo de compilación, pero la inferencia de tipos permite al programador omitirla en muchos casos.

```rust
fn main() {
    let numero1 = 15; // Declaramos una variable con un valor entero
    let numero2 = numero1; // Copiamos el valor de numero1 a numero2

    println!("El valor de numero1 es: {}", numero1); // Imprime 15
    println!("El valor de numero2 es: {}", numero2); // Imprime 15

    let otro_numero = numero2; // Podemos copiar el valor de numero2 a otra variable también
    println!("El valor de otro_numero es: {}", otro_numero); // Imprime 15
}
```

En este caso, se usa la inferencia de tipos; el valor entero 15 se copia de numero1 a numero2. Ambas variables tienen su propia copia independiente del valor.

### Contantes

Las constantes se evalúan en tiempo de compilación y no pueden cambiar durante la ejecución del programa, sus valores se insertan donde sean utilizados.

Es obligatorio especificar el tipo de dato para las constantes en Rust.

Según el libro Rust RFC Book, se insertan cuando se utilizan.

```rust
const GRAVEDAD: f32 = 9.81; // Constante para la aceleración debida a la gravedad (punto flotante)

static NOMBRE_DEL_PROGRAMA: &str = "Calculadora Simple"; // Constante de cadena para el nombre del programa

fn main() {
    println!("La aceleración debida a la gravedad es: {} m/s²", GRAVEDAD);
    println!("El nombre de este programa es: {}", NOMBRE_DEL_PROGRAMA);

    let masa = 50.0; // Variable para la masa
    let fuerza = masa * GRAVEDAD; // Usamos la constante GRAVEDAD en un cálculo
    println!("La fuerza ejercida por un objeto de {} kg es: {} N", masa, fuerza);

    println!("¡Gracias por usar {}!", NOMBRE_DEL_PROGRAMA); // Usamos la constante NOMBRE_DEL_PROGRAMA
}
```

Aquí tenemos :
 * GRAVEDAD: Una constante de tipo f32 que almacena un valor numérico.
 * NOMBRE_DEL_PROGRAMA: Una indicador de tipo &str que almacena una cadena de texto.

Observa cómo las constante se define usando las palabras clave const, deben tener un tipo de dato explícito y se suele nombrar en mayúsculas por convención.

Las constantes de tipo &str (slices de cadena inmutables) se definen utilizando la palabra clave static en lugar de const, aún que pueden ser mutables (aunque a menudo se usan con tipos inmutables como &str). Para el tipo &str la palabra clave a usar es static.

 * const: Se usa para constantes cuyos valores se conocen completamente en tiempo de compilación (por ejemplo, números, booleanos, caracteres).

 * static: Se usa para variables con un tiempo de vida estático (existen durante toda la ejecución del programa) y que pueden ser mutables.

se tratara de forma más habla la palabra clave **static** más adelante.

```rust
// Declaramos una constante llamada MAX_USUARIOS.
const MAX_USUARIOS: u32 = 100;

fn main() {
    // Usamos la constante en nuestro código.
    println!("El número máximo de usuarios permitidos es: {}", MAX_USUARIOS);

    // Podemos usar la constante en comparaciones.
    let usuarios_actuales = 50;
    if usuarios_actuales < MAX_USUARIOS {
        println!("Todavía hay espacio para más usuarios.");
    } else {
        println!("Se ha alcanzado el límite de usuarios.");
    }

    // Intentar modificar una constante generará un error de compilación.
    // MAX_USUARIOS = 101; // Esto no se puede hacer.
}
```

¿Qué está pasando aquí?
 * Declaración de la constante:
   * Usamos la palabra clave const para declarar una constante.
   * Luego viene el nombre de la constante (MAX_USUARIOS). Por convención, se escribe en mayúsculas con guiones bajos para separar las palabras. Esto ayuda a distinguirlas de las variables.
   * A continuación, especificamos el tipo de dato de la constante (u32, que significa un entero sin signo de 32 bits). 
   * Finalmente, asignamos un valor a la constante (100).
 * Uso de la constante:
   * Dentro de la función main, podemos usar la constante MAX_USUARIOS como cualquier otro valor. En el ejemplo, la imprimimos en pantalla y la usamos en una comparación.

 * Inmutabilidad:
   * Una vez que se define una constante, su valor no puede cambiar durante la ejecución del programa. Si intentas reasignar un valor a una constante (como en la línea comentada // MAX_USUARIOS = 101;), el compilador de Rust te mostrará un error.

¿Por qué usar constantes?
 * Claridad: Dan un nombre significativo a valores que son fijos en tu programa, lo que hace que el código sea más fácil de entender.
 * Seguridad: Al ser inmutables, previenen errores accidentales al intentar modificar un valor que se supone que no debe cambiar.
 * Eficiencia: En algunos casos, el compilador puede optimizar el uso de constantes.

Este es un ejemplo básico, pero las constantes son una herramienta fundamental en Rust (y en muchos otros lenguajes de programación) para definir valores que no deben cambiar.
language&>es-ES<&