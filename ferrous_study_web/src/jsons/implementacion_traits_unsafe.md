---
key: 95
name: implementacion_traits
addData: 3/07/2025
updateData: null
keywords: 
 - implementacion traits
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Implementación de Traits Unsafe (Inseguras)
Al igual que con las funciones, puedes marcar un trait como unsafe si la implementación debe asegurar condiciones concretas para evitar un comportamiento indefinido.

Por ejemplo, el crate zerocopy tiene un trait inseguro, que se parece a esto:

```rususe std::mem::size_of_val;
use std::slice;

/// ...
/// # Seguridad
/// El tipo debe tener una representación definida y no tener espacio de relleno.
pub unsafe trait AsBytes {
    fn as_bytes(&self) -> &[u8] {
        unsafe {
            slice::from_raw_parts(
                self as *const Self as *const u8,
                size_of_val(self),
            )
        }
    }
}

// SAFETY: `u32` has a defined representation and no padding.
unsafe impl AsBytes for u32 {}
```

Debería haber una sección # Safety en el Rustdoc para el trait explicando los requisitos para que el trait pueda implementarse de forma segura.

La sección de seguridad actual de AsBytes es bastante más larga y complicada.

Los traits integrados Send y Sync no son seguros.


language&>es-ES<&