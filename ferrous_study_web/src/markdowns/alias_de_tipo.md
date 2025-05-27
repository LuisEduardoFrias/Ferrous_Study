---
key: 43
name: alias_de_tipo
addData:26/05/2025
updateData: null
keywords: 
 - alias
 - tipos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Aliases de tipo
Un alias de tipo crea un nombre para otro tipo. Ambos tipos se pueden utilizar indistintamente.

```rust
enum CarryableConcreteItem {
    Left,
    Right,
}

type Item = CarryableConcreteItem;

// Los alias resultan de más utilidad con tipos largos y complejos:
use std::cell::RefCell;
use std::sync::{Arc, RwLock};
type PlayerInventory = RwLock<Vec<Arc<RefCell<Item>>>>;
```

Los programadores de C verán un parecido con typedef.
language&>es-ES<&