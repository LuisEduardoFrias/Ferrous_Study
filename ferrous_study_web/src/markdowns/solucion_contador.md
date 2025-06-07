---
key: 106
name: solucion_contador
addData: 06/06/2025
updateData: null
keywords:
- solución
- contador
languages:
- key: Español
value: es-ES
---
language&>es-ES<&
# Solución contador

```rust
use std::collections::HashMap;
use std::hash::Hash;

/// Counter cuenta el número de veces que se ha visto cada valor de tipo T.
struct Counter<T> {
values: HashMap<T, u64>,
}

impl<T: Eq + Hash> Counter<T> {
/// Crea un nuevo Counter.
fn new() -> Self {
Counter { values: HashMap::new() }
}

/// Cuenta una repetición del valor dado.
fn count(&mut self, value: T) {
*self.values.entry(value).or_default() += 1;
}

/// Devuelve el número de veces que se ha visto el valor dado.
fn times_seen(&self, value: T) -> u64 {
self.values.get(&value).copied().unwrap_or_default()
}
}

fn main() {
let mut ctr = Counter::new();
ctr.count(13);
ctr.count(14);
ctr.count(16);
ctr.count(14);
ctr.count(14);
ctr.count(11);

for i in 10..20 {
println!("se han visto {} valores iguales a {}", ctr.times_seen(i), i);
}

let mut strctr = Counter::new();
strctr.count("manzana");
strctr.count("naranja");
strctr.count("manzana");
println!("se han visto {} manzanas", strctr.times_seen("manzana"));
}
```

language&>es-ES<&