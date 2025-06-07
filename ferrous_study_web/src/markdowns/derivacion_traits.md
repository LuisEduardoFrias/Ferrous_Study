---
key: 87
name: derivacion_traits
addData: 06/06/2025
updateData: null
keywords: 
 - derivacion
 - traits
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Derivación de Traits
Los traits compatibles se pueden implementar de forma automática en los tipos personalizados de la siguiente manera:

```rust
#[derive(Debug, Clone, Default)]
struct Player {
    name: String,
    strength: u8,
    hit_points: u8,
}

fn main() {
    let p1 = Player::default(); // El trait predeterminado añade el constructor `default`.
    let mut p2 = p1.clone(); // El trait clonado añade el método `clone`.
    p2.name = String::from("EldurScrollz");
    // El trait Debug permite que sea compatible con imprimir con `{:?}`.
    println!("{:?} contra {:?}", p1, p2);
}
```

La derivación se implementa con macros y muchos crates ofrecen macros de derivación útiles para añadir funciones. Por ejemplo, serde puede derivar la
compatibilidad con la serialización para una struct con #[derive(Serialize)].
language&>es-ES<&