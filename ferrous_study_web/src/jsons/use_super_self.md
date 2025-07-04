---
key: 74
name: use_super_self
addData: 3/07/2025
updateData: null
keywords: 
 - modulos
 - super self
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# use, super, self
Un módulo puede incluir símbolos de otro módulo en el ámbito con use. Normalmente, se ve algo como esto en la parte superior de cada módulo:

```rust
use std::collections::HashSet;
use std::process::abort;
```

Rutas
Las rutas se resuelven de la siguiente manera:

Como ruta relativa:

foo o self::foo hacen referencia a foo en el módulo corriente,
super::foo hace referencia a foo en el módulo superior.
Como ruta absoluta:

crate::foo hace referencia a foo en la raíz del crate corriente,
bar::foo hace referencia a foo en el crate bar.


Es habitual “volver a exportar” los símbolos en una ruta más corta. Por ejemplo, el archivo lib.rs de nivel superior de un crate puede hacer que

```rust
mod storage;

pub use storage::disk::DiskStorage;
pub use storage::network::NetworkStorage;
```

haciendo que DiskStorage y NetworkStorage estén disponibles para otros crates con una ruta corta y práctica.

La mayoría de las veces, únicamente deben ser use los elementos que aparecen en un módulo. Sin embargo, un trait debe encontrarse dentro del ámbito para llamar a cualquier método de ese trait, incluso aunque ya haya un tipo que implemente dicho trait dentro del ámbito. Por ejemplo, para usar el método read_to_string en un tipo que implemente el trait Read, debes usar std::io::Read`.

La instrucción use puede tener un comodín: use std::io::*. No se recomienda su uso porque no está claro qué elementos se importan y cuáles podrían cambiar con el tiempo.


language&>es-ES<&