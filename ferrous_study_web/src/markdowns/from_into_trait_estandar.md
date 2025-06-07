---
key: 109
name: from_into_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - from into
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
From e Into
Los tipos implementan From y Into para facilitar las conversiones de tipos:

```rust
fn main() {
    let s = String::from("hola");
    let addr = std::net::Ipv4Addr::from([127, 0, 0, 1]);
    let one = i16::from(true);
    let bigger = i32::from(123_i16);
    println!("{s}, {addr}, {one}, {bigger}");
}
```

Into se implementa automáticamente cuando se implementa From:

```rust
fn main() {
    let s: String = "hola".into();
    let addr: std::net::Ipv4Addr = [127, 0, 0, 1].into();
    let one: i16 = true.into();
    let bigger: i32 = 123_i16.into();
    println!("{s}, {addr}, {one}, {bigger}");
}
```

Por eso se suele implementar solo From, ya que el tipo ya habrá implementado también Into.
Cuando se declara un tipo de entrada de argumento de función como “cualquier elemento que se pueda convertir en String”, la regla es la contraria y se
debe usar Into. La función aceptará tipos que implementen From y aquellos que solo implementen Into.
language&>es-ES<&