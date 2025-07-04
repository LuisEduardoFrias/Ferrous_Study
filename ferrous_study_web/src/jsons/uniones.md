---
key: 93
name: uniones
addData: 3/07/2025
updateData: null
keywords: 
 - uniones
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Uniones
Las uniones son como enums (enumeraciones), pero eres tú quien debe hacer el seguimiento del campo activo:

```rust
#[repr(C)]
union MyUnion {
    i: u8,
    b: bool,
}

fn main() {
    let u = MyUnion { i: 42 };
    println!("int: {}", unsafe { u.i });
    println!("bool: {}", unsafe { u.b }); // ¡Comportamiento indefinido!
}
```

Las uniones raramente son necesarias en Rust, ya que se suele utilizar una enum. A veces se necesitan para interactuar con APIs de biblioteca C.

Si solo quieres reinterpretar los bytes como otro tipo, probablemente te interese std::mem::transmute o una envoltura segura, como el crate zerocopy.
language&>es-ES<&