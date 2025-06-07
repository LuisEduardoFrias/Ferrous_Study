---
key: 77
name: match
addData: 06/06/2025
updateData: null
keywords: 
 - match
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Match
La palabra clave match te permite comparar un valor con uno o varios patrones. Las comparaciones se hacen de arriba a abajo y el primer patrón que coincida gana.

Los patrones pueden ser valores simples, del mismo modo que switch en C y C++:

```resul
#[rustfmt::skip]
fn main() {
    let input = 'x';
    match input {
        'q'                       => println!("Salir"),
        'a' | 's' | 'w' | 'd'     => println!("Desplazarse"),
        '0'..='9'                 => println!("Introducción de números"),
        key if key.is_lowercase() => println!("Minúscula: {key}"),
        _                         => println!("Otro"),
    }
}
```

_ es un patrón comodín que coincide con cualquier valor. Las expresiones deben ser exhuastivas, lo que significa que deben tener en cuenta todas las posibilidades, por lo que _ a menudo se usa como un caso final que atrapa todo.

Match puede ser usado como una expresión. Al igual que con if let, cada brazo de coincidencia debe ser del mismo tipo. El tipo es la última expresión del bloque, si la hay. En el ejemplo anterior, el tipo es ().

Una variable del patrón (en este ejemplo, key) creará un enlace que se puede usar dentro del brazo de coincidencia.

Un protección de coincidencia hace que la expresión coincida únicamente si se cumple la condición.

Puntos Clave:

Puedes señalar cómo se usan algunos caracteres concretos en un patrón

| como or
.. puede ampliarse tanto como sea necesario
1..=5 representa un rango inclusivo
_ es un comodín
Las guardas de coincidencia, como característica sintáctica independiente, son importantes y necesarios cuando queremos expresar de forma concisa ideas más complejas de lo que permitirían los patrones por sí solos.

No son lo mismo que una expresión if independiente dentro del brazo de coincidencias. Una expresión if dentro del bloque de ramas (después de =>) se produce tras seleccionar el brazo de coincidencias. Si no se cumple la condición if dentro de ese bloque, no se tienen en cuenta otros brazos de la expresión match original.

La condición definida en el guarda se aplica a todas las expresiones de un patrón con un |.
language&>es-ES<&