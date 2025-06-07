---
key: 138
name: duraciones_vida_estructuras
addData: 07/06/2025
updateData: null
keywords: 
 - duraciones de vida de estructuras
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Tiempos de vida en estructuras de datos
Si un tipo de datos almacena datos prestados, se debe anotar con tiempo de vida:

```rust
#[derive(Debug)]
struct Highlight<'doc>(&'doc str);

fn erase(text: String) {
    println!("¡Adiós, {text}!");
}

fn main() {
    let text = String::from("El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.");
    let fox = Highlight(&text[4..19]);
    let dog = Highlight(&text[35..43]);
    // erase(text);
    println!("{fox:?}");
    println!("{dog:?}");
}
```

En el ejemplo anterior, la anotación en Highlight hace que los datos subyacentes a la &str contenida tengan al menos la misma duración que cualquier instancia de Highlight que utilice esos datos.
Si text se consume antes de que acabe el tiempo de vida de fox (o dog), el borrow checker (verificador de préstamos) muestra un error.
Los tipos con datos prestados (borrowed) obligan a los usuarios a conservar los datos originales. Esto puede ser útil para crear vistas ligeras aunque, por lo general, hace que sean un poco más difíciles de usar.
Siempre que sea posible, haz que las estructuras de datos sean propietarias directas de sus datos.
Algunas estructuras con varias referencias dentro pueden tener más de una anotación de tiempo de vida. Esto puede ser necesario si hay que describir
las relaciones de tiempo de vida entre las propias referencias, además del tiempo de vida de la propia estructura. Estos son casos prácticos muy
avanzados.
language&>es-ES<&