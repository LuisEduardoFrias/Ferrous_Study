---
key: 85
name: super_traits
addData: 06/06/2025
updateData: null
keywords: 
 - super traits
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Supertraits
Un trait puede requerir que los tipos que lo implementan también implementen otros traits, llamados supertraits. Aquí, cualquier tipo implementando Pet también debe implementar Animal.

```rust
trait Animal {
    fn leg_count(&self) -> u32;
}

trait Pet: Animal {
    fn name(&self) -> String;
}

struct Dog(String);

impl Animal for Dog {
    fn leg_count(&self) -> u32 {
        4
    }
}

impl Pet for Dog {
    fn name(&self) -> String {
        self.0.clone()
    }
}

fn main() {
    let puppy = Dog(String::from("Rex"));
    println!("{} tiene {} piernas", puppy.name(), puppy.leg_count());
}
```

Algunas veces esto es llamado “herencia de traits”, pero los estudiantes no deben esperar que esto se comporte como la herencia OO (object-oriented).
Solo especifica un requerimiento adicional sobre las implementaciones de un trait.
language&>es-ES<&