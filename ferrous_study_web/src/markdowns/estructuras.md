---
key: 39
name: estructuras
addData: 26/05/2025
updateData: null
keywords: 
 - struc
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Estructuras con nombre

Al igual que C y C++, Rust admite estructuras (struct) personalizadas:

```rust
struct Person {
    name: String,
    age: u8,
}

fn describe(person: &Person) {
    println!("{} tiene {} años", person.name, person.age);
}

fn main() {
    let mut peter = Person { name: String::from("Peter"), age: 27 };
    describe(&peter);

    peter.age = 28;
    describe(&peter);

    let name = String::from("Avery");
    let age = 39;
    let avery = Person { name, age };
    describe(&avery);

    let jackie = Person { name: String::from("Jackie"), ..avery };
    describe(&jackie);
}
```

Puntos Clave:

Las estructuras funcionan como en C o en C++.
Al igual que en C++, y a diferencia de C, no se necesita typedef para definir un tipo.
A diferencia de C++, no existe ninguna herencia entre las estructuras.
Puede que sea un buen momento para indicar a los alumnos que existen diferentes tipos de estructuras.
Las estructuras de tamaño cero, como struct Foo;, se pueden utilizar al implementar un trait en algún tipo en cuyo valor no quieres almacenar datos.
La siguiente diapositiva presentará las estructuras de tuplas, que se utilizan cuando los nombres de los campos no son importantes.
Si ya dispones de variables con los nombres adecuados, puedes crear la estructura con un método abreviado.
La sintaxis ..avery nos permite copiar la mayoría de los campos de la estructura anterior sin tener que escribirlos explícitamente. Siempre debe ser
el último elemento.
language&>es-ES<&