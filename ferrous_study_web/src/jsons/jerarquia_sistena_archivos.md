---
key: 72
name: jerarquia_sistena_archivos
addData: 3/07/2025
updateData: null
keywords: 
 - modulo
 - jerarquia de archivos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Jerarquía del sistema de archivos
Omitir el contenido del módulo hará que Rust lo busque en otro archivo:

```rust
&>notplay
&>notcopy
mod garden;
```

Esto indica que el contenido del módulo garden se encuentra en src/garden.rs. Del mismo modo, el módulo garden::vegetables se encuentra en src/garden/vegetables.rs.

La raíz de crate está en:

src/lib.rs (para un crate de biblioteca)
src/main.rs (para un crate binario)

Los módulos definidos en archivos también se pueden documentar mediante “comentarios internos del documento”. En ellos se indica el elemento que los contiene, en este caso, un módulo.

```rust
//! Este módulo implementa el jardín, incluida una germinación de alto rendimiento.
//!

// Vuelve a exportar los tipos de este módulo.
pub use garden::Garden;
pub use seeds::SeedPacket;

/// Siembra los paquetes de semilla determinados.
pub fn sow(seeds: Vec<SeedPacket>) {
    todo!()
}

/// Cosecha el producto en el jardín que esté listo.
pub fn harvest(garden: &mut Garden) {
    todo!()
}
```

Antes de Rust 2018, los módulos debían ubicarse en module/mod.rs en lugar de en module.rs. Esta alternativa sigue existiendo en las ediciones posteriores a 2018.

El principal motivo de introducir filename.rs en lugar de filename/mod.rs se debe a que si muchos archivos llamados mod.rs puede ser difícil distinguirlos en IDEs.

Un anidamiento más profundo puede usar carpetas, incluso si el módulo principal es un archivo:

```bash
src/
├── main.rs
├── top_module.rs
└── top_module/
    └── sub_module.rs

```

El lugar donde Rust buscará los módulos se puede cambiar con una directiva del compilador:

```bash
#[path = "some/path.rs"]
mod some_module;
```

Esto resulta útil, por ejemplo, si deseas colocar pruebas de un módulo en un archivo denominado some_module_test.rs, similar a la convención en Go.
language&>es-ES<&