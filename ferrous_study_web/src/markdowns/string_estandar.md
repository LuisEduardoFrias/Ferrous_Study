---
key: 102
name: string_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - biblioteca estandar
 - string
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# String
String es el búfer de cadena ampliable UTF-8 estándar:

```rust
fn main() {
    let mut s1 = String::new();
    s1.push_str("Hola");
    println!("s1: longitud = {}, capacidad = {}", s1.len(), s1.capacity());

    let mut s2 = String::with_capacity(s1.len() + 1);
    s2.push_str(&s1);
    s2.push('!');
    println!("s2: longitud= {}, capacidad = {}", s2.len(), s2.capacity());

    let s3 = String::from("🇨🇭");
    println!("s3: longitud = {}, número de caracteres = {}", s3.len(), s3.chars().count());
}
```

String implementa [Deref<Target = str>][2], lo que significa que puedes llamar a todos los métodos str en una String.

String::new devuelve una nueva cadena vacía. Usa String::with_capacity cuando sepas cuántos datos quieres guardar.
String::len devuelve el tamaño de String en bytes (que puede ser diferente de su longitud en caracteres).
String::chars devuelve un iterador sobre los caracteres reales. Ten en cuenta que un char puede ser diferente de lo que un humano consideraría un “caracter”, debido a los grupos de grafemas.
Cuando la gente se refiere a una cadena, pueden estar hablando de &str o de String.
Cuando un tipo implementa Deref<Target = T>, el compilador te permite llamar a métodos de forma transparente desde T.
Todavía no hemos abordado el trait Deref, por lo que en este momento esto explica principalmente la estructura de la barra lateral de la documentación.
String implementa Deref<Target = str>, que le proporciona acceso transparente a los métodos de str.
Escribe y compara let s3 = s1.deref(); y let s3 = &*s1;.
String se implementa como un envoltorio alrededor de un vector de bytes. Muchas de las operaciones que ves como compatibles con vectores también lo son con String, pero con algunas garantías adicionales.
Compara las diferentes formas de indexar String:
A un carácter mediante s3. chars().nth(i).unwrap(), donde i está dentro o fuera de los límites.
A una cadena secundaria mediante s3[0..4], donde el slice está en los límites de caracteres o no.
Muchos tipos pueden ser convertidos a una cadena con el método to_string. Este trait es automáticamente implementado para cualquier tipo que
implemente Display, entonces cualquier objeto que pueda ser formateado también puede ser convertido a una cadena.
language&>es-ES<&