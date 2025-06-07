---
key: 119
name: semantica_movimiento
addData: 07/06/2025
updateData: null
keywords: 
 - semantica decmovimiento
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Semántica de movimiento
Una asignación transferirá su ownership entre variables:

```rust
fn main() {
    let s1: String = String::from("¡Hola!");
    let s2: String = s1;
    println!("s2: {s2}");
    // println!("s1: {s1}");
}
```

La asignación de s1 a s2 transfiere el ownership.
Cuando s1 queda fuera del ámbito, no ocurre nada: no le pertenece nada.
Cuando s2 sale del ámbito, los datos de la cadena se liberan.

Antes de mover a s2:

```bash
&>notcopy
&>notplay
+------------------+     +-----------------------------+
|      Stack       |     |             Heap            |
|------------------|     |-----------------------------|
|  s1              |     |                             |
|  +------------+  |     |  +---+---+---+---+---+---+  |
|  | ptr      o-|--|-----|->| H | e | l | l | o | ! |  |
|  | len      6 |  |     |  +---+---+---+---+---+---+  |
|  | capacity 6 |  |     |                             |
|  +------------+  |     |                             |
|                  |     |                             |
+------------------+     +-----------------------------+
```

Después de mover a s2:

```bash
&>notcopy
&>notplay
+---------------------+     +-----------------------------+
|        Stack        |     |             Heap            |
|---------------------|     |-----------------------------|
|  s1 (inaccessible)  |     |                             |
|  +---------------+  |     |  +---+---+---+---+---+---+  |
|  | ptr         o-|--|--+--|->| H | e | l | l | o | ! |  |
|  | len         6 |  |  |  |  +---+---+---+---+---+---+  |
|  | capacity    6 |  |  |  |                             |
|  +---------------+  |  |  +-----------------------------+
|                     |  | 
|  s2                 |  | 
|  +---------------+  |  |
|  | ptr         o-|--|--+ 
|  | len         6 |  |
|  | capacity    6 |  |
|  +---------------+  |
+---------------------+

```

Cuando pasas un valor a una función, el valor se asigna al parámetro de la función. Esta acción transfiere el ownership:

```rust
fn say_hello(name: String) {
    println!("Hola {name}")
}

fn main() {
    let name = String::from("Alice");
    say_hello(name);
    // say_hello(name);
}
```

Menciona que es lo contrario de los valores predeterminados de C++, que se copian por valor, a menos que utilices std::move (y que el constructor de movimiento esté definido).

Es únicamente el ownership el que se mueve. Si se genera algún código máquina para manipular los datos en sí, se trata de una cuestión de optimización, y esas copias se optimizan de forma agresiva.

Los valores simples (como los enteros) se pueden marcar como Copy (consulta las diapositivas posteriores).

En Rust, la clonación es explícita (usando clone).

En el ejemplo de say_hello:

Con la primera llamada a say_hello, main deja de tener el ownership de name. Después, ya no se podrá usar name dentro de main.
La memoria de heap asignada a name se liberará al final de la función say_hello.
main podrá conservar el _ownership_ si pasaname como referencia (&name) y si say_hello` acepta una referencia como parámetro.
Por otro lado, main puede pasar un clon de name en la primera llamada (name.clone()).
Rust hace que resulte más difícil que en C++ crear copias por error al definir la semántica de movimiento como predeterminada y al obligar a los programadores a clonar sólo de forma explícita.
Más información
Copias Defensivas en C++ Moderno
La versión moderna de C++ soluciona este problema de forma diferente:

```rust
&>notcopy
std::string s1 = "Cpp";
std::string s2 = s1;  // Duplica los datos en s1.
```

Los datos de la stack de s1 se duplican y s2 obtiene su propia copia independiente.
Cuando s1 y s2 salen del ámbito, cada uno libera su propia memoria.

Antes de la asignación de copias:

```bash
&>notcopy
&>notplay
+------------------+     +-----------------+
|       Stack      |     |      Heap       |
|------------------|     |-----------------|
|  s1              |     |                 |
|  +------------+  |     |  +---+---+---+  |
|  | ptr      o-|--|-----|->| C | p | p |  |
|  | len      3 |  |     |  +---+---+---+  |
|  | capacity 3 |  |     |                 |
|  +------------+  |     |                 |
|                  |     |                 |
+------------------+     +-----------------+

```

Después de la asignación de copia:

```bash
&>notcopy
&>notplay
+------------------+     +-----------------+
|      Stack       |     |      Heap       |
|------------------|     |-----------------|
|  s1              |     |                 |
|  +------------+  |     |  +---+---+---+  |
|  | ptr      o-|--|-----|->| C | p | p |  |
|  | len      3 |  |     |  +---+---+---+  |
|  | capacity 3 |  |     |                 |
|  +------------+  |     |                 |
|                  |     |                 |
|  s2              |     |                 |
|  +------------+  |     |  +---+---+---+  |
|  | ptr      o-|--|-----|->| C | p | p |  |
|  | len      3 |  |     |  +---+---+---+  |
|  | capacity 3 |  |     |                 |
|  +------------+  |     |                 |
+------------------+     +-----------------+

```

Puntos clave:

C++ ha tomado una decisión algo distinta a Rust. Puesto que = copia los datos, los datos de cadena deben clonarse. De lo contrario, obtendríamos un error double free si alguna de las cadenas saliera fuera del ámbito.

C++ también tiene std::move, que se usa para indicar cuándo se puede mover un valor. Si el ejemplo hubiera sido s2 = std::move(s1), no se llevaría a cabo ninguna asignación de montículo. Después del movimiento, s1 tendría un estado válido, pero no especificado. A diferencia de Rust, el programador puede seguir utilizando s1.

A diferencia de Rust, en C++ se puede ejecutar código arbitrario con = según el tipo que se vaya a copiar o mover.

language&>es-ES<&