---
key: 36
name: cadena_de_text_string
addData: 19/05/2025
updateData: null
keywords: 
 - cadena
 - texto
 - string
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Cadenas de texto (Strings)
Ahora podemos entender los dos tipos de cadenas de Rust:

&str es un slice de bytes codificados en UTF-8, parecido a &[u8].
String es un buffer adueñado de bytes codificados en UTF-8, parecido a Vec<T>.

```rust
fn main() {
    let s1: &str = "mundo";
    println!("s1: {s1}");

    let mut s2: String = String::from("¡Hola ");
    println!("s2: {s2}");
    s2.push_str(s1);
    println!("s2: {s2}");

    let s3: &str = &s2[s2.len() - s1.len()..];
    println!("s3: {s3}");
}
```

&str introduce un slice de cadena, que es una referencia inmutable a los datos de cadena codificados en UTF-8 y almacenados en un bloque de memoria. Los literales de cadena ("Hello") se almacenan en el binario del programa.

El tipo String de Rust es un envoltorio que rodea a un vector de bytes. Como sucede con Vec<T>, tiene propietario.

Al igual que ocurre con muchos otros tipos, String::from() crea una cadena a partir de un literal de cadena. String::new() crea una cadena vacía a la que se pueden añadir datos de cadena mediante los métodos push() y push_str().

La macro format!() es una forma práctica de generar una cadena propia a partir de valores dinámicos. Acepta la misma especificación de formato que println!().

Puedes tomar prestados slices &str de String a través de & y, de forma opcional, la selección de intervalos. Si seleccionas un intervalo de bytes que no esté alineado con los límites de caracteres, la expresión activará un pánico. El iterador chars itera sobre los caracteres y se aconseja esta opción a intentar definir los límites de los caracteres correctamente.

Para los programadores de C++: piensa en &str como el const char* de C++, pero uno que siempre apunta a una cadena válida en la memoria. El String de Rust es parecido a std::string de C++ (la diferencia principal es que solo puede contener bytes codificados en UTF-8 y nunca utilizará una optimización de cadena pequeña).

Los literales de cadenas de bytes te permiten crear un valor &[u8] directamente:

```rust
fn main() {
    println!("{:?}", b"abc");
    println!("{:?}", &[97, 98, 99]);
}
```

Las cadenas sin formato te permiten crear un valor &str con los escapes inhabilitados: r"\n" == "\\n". Puedes insertar comillas dobles con la misma
cantidad de # a cada lado de ellas:

```rust
fn main() {
    println!(r#"<a href="link.html">link</a>"#);
    println!("<a href=\"link.html\">link</a>");
}
```
language&>es-ES<&