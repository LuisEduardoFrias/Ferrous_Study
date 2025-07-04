---
key: 73
name: visibilidad
addData: 3/07/2025
updateData: null
keywords: 
 - modulos
 - visibilidad
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Visibilidad
Los módulos marcan el límite de la privacidad:

Los elementos del módulo son privados de forma predeterminada (se ocultan los detalles de implementación).
Los elementos superiores y los del mismo nivel siempre están visibles.
Es decir, si un elemento está visible en el módulo foo, se verá en todos los elementos descendientes de foo.

```rust
mod outer {
    fn private() {
        println!("outer::private");
    }

    pub fn public() {
        println!("outer::public");
    }

    mod inner {
        fn private() {
            println!("outer::inner::private");
        }

        pub fn public() {
            println!("outer::inner::public");
            super::private();
        }
    }
}

fn main() {
    outer::public();
}
```

Haz que los módulos sean públicos con la palabra clave pub.
Además, hay especificadores pub(...) avanzados para restringir el ámbito de la visibilidad pública.

Consulta el libro Rust Reference.
Configurar la visibilidad de pub(crate) es un patrón común.
Aunque es menos frecuente, se puede dar visibilidad a una ruta específica.
En cualquier caso, se debe dar visibilidad a un módulo antecedente (y a todos sus descendientes).

language&>es-ES<&