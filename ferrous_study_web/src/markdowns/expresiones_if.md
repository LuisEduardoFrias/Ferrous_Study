## Expresiones `if` en Rust: Control de Flujo y Evaluación Condicional

La expresión `if` en Rust te permite ejecutar diferentes bloques de código basándote en el valor de una condición booleana. Además de su uso tradicional para el control de flujo, en Rust, `if` también puede actuar como una expresión que evalúa a un valor.

### `if` como Declaración Condicional

La forma más común de usar `if` es para ejecutar un bloque de código si una condición es verdadera. Opcionalmente, puedes incluir un bloque `else` que se ejecuta si la condición es falsa, y también puedes encadenar múltiples condiciones con `else if`.

```rust
&title>Ejemplo básico de `if` como declaración<title&
fn main() {
    let temperatura = 25;

    if temperatura > 20 {
        println!("¡Hace calor!");
    } else if temperatura > 10 {
        println!("La temperatura es agradable.");
    } else {
        println!("¡Hace frío!");
    }
}
```

En este ejemplo:

* Primero, se evalúa la condición `temperatura > 20`. Si es verdadera, se ejecuta el primer bloque `println!`.
* Si la primera condición es falsa, se evalúa la siguiente condición en el `else if`: `temperatura > 10`. Si es verdadera, se ejecuta su bloque.
* Si ambas condiciones anteriores son falsas, se ejecuta el bloque del `else`.

<br />

## `if` como Expresión

Una característica poderosa de Rust es que `if` puede ser utilizado como una expresión. Esto significa que el resultado de la evaluación de la expresión `if` puede ser asignado a una variable. El valor de la expresión `if` será el valor de la última expresión dentro del bloque que se ejecutó.

```rust
&title>`if` como expresión para asignar un valor<title&
fn main() {
    let condicion = true;
    let mensaje = if condicion {
        "La condición era verdadera" // Valor si la condición es true
    } else {
        "La condición era falsa"    // Valor si la condición es false
    };

    println!("El mensaje es: {}", mensaje);
}
```

En este caso, si `condicion` es `true`, la variable `mensaje` se asignará al valor de la cadena `"La condición era verdadera"`. Si `condicion` fuera `false`, `mensaje` se asignaría a `"La condición era falsa"`.

**Puntos Importantes cuando `if` es una Expresión:**

* **Tipos Coincidentes:** Dado que una expresión `if` debe evaluar a un único tipo, todos los bloques de las ramas `if`, `else if`, y `else` (si están presentes) deben producir valores del mismo tipo.

Veamos un ejemplo de lo que sucede si los tipos no coinciden:

```rust
&title>Error de tipos no coincidentes en una expresión `if`<title&
fn main() {
    let condicion = true;
    // El primer bloque devuelve un &str, el segundo un i32. Esto causará un error.
    // let resultado = if condicion {
    //     "verdadero"
    // } else {
    //     10
    // };
    // println!("El resultado es: {}", resultado);
}
```

El compilador de Rust señalará un error porque no puede determinar un único tipo para la variable `resultado`.

* **Bloque `else` Obligatorio (en ciertos casos):** Si la expresión `if` no cubre todos los posibles casos (es decir, la condición no siempre es `true` o `false` en un sentido lógico más amplio), y quieres que la expresión `if` siempre evalúe a un valor, entonces una rama `else` es obligatoria. De lo contrario, en el caso donde la condición del `if` es falsa y no hay `else`, la expresión `if` no produciría ningún valor en ese escenario, lo cual no es válido para una asignación.

Sin embargo, si el tipo de retorno esperado es el tipo unitario `()`, puedes tener un `if` sin `else`. En este caso, si la condición es falsa, la expresión `if` implícitamente evalúa a `()`.

```rust
&title>`if` sin `else` evaluando a `()`<title&
fn main() {
    let valor = 5;
    let _resultado = if valor > 10 {
        println!("El valor es mayor que 10");
    }; // _resultado será () si valor no es mayor que 10
}
```

* **Punto y Coma después de la Expresión `if`:** Cuando utilizas `if` como una expresión y asignas su resultado a una variable, la declaración completa (incluida la expresión `if`) debe terminar con un punto y coma `;`.

```rust
&title>Uso correcto del punto y coma con `if` como expresión<title&
fn main() {
    let numero = 7;
    let tipo = if numero % 2 == 0 {
        "par"
    } else {
        "impar"
    }; // El punto y coma marca el final de la declaración
    println!("El número {} es {}", numero, tipo);
}
```

**¿Qué sucede al añadir `;` dentro de los bloques de la expresión `if`?**

Si añades un punto y coma al final de la última expresión dentro de un bloque de una expresión `if`, esa expresión dejará de ser el valor de retorno implícito del bloque. En su lugar, el bloque devolverá el tipo unitario `()` (ya que el punto y coma convierte una expresión en una declaración que no devuelve un valor). Esto causará un error si esperas un tipo diferente de la expresión `if`.

```rust
&title>Error al añadir `;` al final de un bloque `if` como expresión<title&
fn main() {
    let condicion = true;
    // Esto causará un error porque el primer bloque ahora devuelve ()
    // mientras que el segundo devuelve "&str".
    // let mensaje = if condicion {
    //     "verdadero"; // El punto y coma hace que este bloque devuelva ()
    // } else {
    //     "falso"
    // };
    // println!("El mensaje es: {}", mensaje);
}
```

**Error al omitir `;` después de la expresión `if` (cuando se usa como expresión):**

Si utilizas `if` como una expresión y olvidas el punto y coma al final de la declaración de asignación, el compilador esperará que la siguiente línea de código sea parte de la expresión `if` (lo cual probablemente no será el caso) y generará un error de sintaxis.

```rust
&title>Error al omitir `;` después de una expresión `if`<title&
fn main() {
    let numero = 5;
    let resultado = if numero > 0 {
        "positivo"
    } else {
        "no positivo"
    } // Falta el punto y coma aquí
    println!("El número es {}", resultado);
}
```

El compilador esperará un punto y coma para marcar el final de la declaración que incluye la expresión `if`.

<br />
<hr />
<br />

La expresión `if` en Rust es una herramienta versátil para el control de flujo y la evaluación condicional de valores. Comprender su doble funcionalidad y las reglas sobre los tipos coincidentes y el uso del punto y coma es crucial para escribir código Rust correcto y eficiente. 