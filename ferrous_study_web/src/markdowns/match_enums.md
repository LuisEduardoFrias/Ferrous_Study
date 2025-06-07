---
key: 79
name: match_enums
addData: 06/06/2025
updateData: null
keywords: 
 - match
 - enums
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Enumeraciones
Al igual que las tuplas, las enumeraciones también se pueden desestructurar con la coincidencia:

Los patrones también se pueden usar para enlazar variables a partes de los valores. Así es como se inspecciona la estructura de tus tipos. Empecemos con un tipo enum sencillo:

```rust
enum Result {
    Ok(i32),
    Err(String),
}

fn divide_in_two(n: i32) -> Result {
    if n % 2 == 0 {
        Result::Ok(n / 2)
    } else {
        Result::Err(format!("no se puede dividir {n} en dos partes iguales"))
    }
}

fn main() {
    let n = 100;
    match divide_in_two(n) {
        Result::Ok(half) => println!("{n} dividido entre dos es {half}"),
        Result::Err(msg) => println!("se ha producido un error: {msg}"),
    }
}
```

Aquí hemos utilizado los brazos para desestructurar el valor de Result. En el primer brazo, half está vinculado al valor que hay dentro de la variante Ok. En el segundo, msg está vinculado al mensaje de error.

La expresión if/else devuelve una enumeración que más tarde se descomprime con match.
Puedes probar a añadir una tercera variante a la definición de la enumeración y mostrar los errores al ejecutar el código. Señala los lugares en los que tu código está ahora incompleto y explica cómo el compilador intenta dar sugerencias.
Solo se puede acceder a los valores de las variantes de enumeración una vez que coincidan con el patrón.
Demuestra lo que pasa cuando la búsqueda no es exhaustiva. Ten en cuenta la ventaja que ofrece el compilador de Rust al confirmar que se gestionan todos los casos.
Guarda el resultado de divide_in_two en la variable result y hazlo coincidir mediante match en un bucle. No se compilará porque se utilizará msg
cuando coincida. Para solucionarlo, haz coincidir &result en lugar de result. De esta forma, msg se convertirá en una referencia y no se utilizará.
Esta “ergonomía de coincidencia” apareció en Rust 2018. Si quieres que sea compatible con las versiones anteriores de Rust, sustituye msg por ref msg
en el patrón.
language&>es-ES<&