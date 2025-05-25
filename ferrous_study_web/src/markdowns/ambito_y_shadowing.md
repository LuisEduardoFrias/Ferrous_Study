---
key: 29
name: ambito_y_shadowing
addData: 19/05/2025
updateData: null
keywords: 
 - ámbito
 - shadowing
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
## Ámbitos y Shadowing

El ámbito de una variable se limita al bloque que la contiene.

Puedes sombrear variables, tanto las de ámbitos externos como las del propio ámbito:

```rust
fn main() {
    let a = 10;
    println!("antes: {a}");
    {
        let a = "hola";
        println!("ámbito interno: {a}");

        let a = true;
        println!("sombreado en el ámbito interno: {a}");
    }

    println!("después: {a}");
}
```

Para demostrar que el ámbito de una variable está limitado, añade una b en el bloque interno del último ejemplo y, a continuación, intenta acceder a ella desde fuera de ese bloque.
Definición: Shadowing (sombreado) es distinto de la mutación, ya que después de sombrear las ubicaciones de memoria de las dos variables existen al mismo tiempo. Ambas están disponibles bajo el mismo nombre, en función de dónde se utiliza en el código.
Una variable sombreada puede tener un tipo diferente.
Al principio, el sombreado no es fácil, pero resulta útil para conservar valores después de **.unwrap()**.
language&>es-ES<&