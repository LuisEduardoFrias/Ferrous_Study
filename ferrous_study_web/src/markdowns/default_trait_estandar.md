---
key: 113
name: default_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - default
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
El trait Default
El trait Default produce un valor predeterminado para un tipo.

```rust
#[derive(Debug, Default)]
struct Derived {
    x: u32,
    y: String,
    z: Implemented,
}

#[derive(Debug)]
struct Implemented(String);

impl Default for Implemented {
    fn default() -> Self {
        Self("John Smith".into())
    }
}

fn main() {
    let default_struct = Derived::default();
    println!("{default_struct:#?}");

    let almost_default_struct =
        Derived { y: "Ya está configurado.".into(), ..Derived::default() };
    println!("{almost_default_struct:#?}");

    let nothing: Option<Derived> = None;
    println!("{:#?}", nothing.unwrap_or_default());
}
```

Se puede implementar directamente o se puede derivar a través de #[derive(Default)].
Una implementación derivada producirá un valor en el que todos los campos tendrán sus valores predeterminados.
Esto significa que todos los tipos de la estructura también deberán implementar Default.
Los tipos estándar de Rust suelen implementar Default con valores razonables (por ejemplo, 0, "", etc.).
La inicialización parcial de estructuras funciona bien con los valores predeterminados.
La biblioteca estándar de Rust tiene en cuenta que los tipos pueden implementar Default y, por ello, proporciona métodos prácticos que lo utilizan.
la sintaxis .. se denomina sintaxis de actualización de estructuras.
language&>es-ES<&