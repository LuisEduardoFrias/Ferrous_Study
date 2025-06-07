---
key: 103
name: vectores_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - biblioteca estandar
 - vectores
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Vec (Vectores)
Vec es el búfer estándar redimensionable asignado al heap:

```rust
fn main() {
    let mut v1 = Vec::new();
    v1.push(42);
    println!("v1: longitud= {}, capacidad = {}", v1.len(), v1.capacity());

    let mut v2 = Vec::with_capacity(v1.len() + 1);
    v2.extend(v1.iter());
    v2.push(9999);
    println!("v2: longitud= {}, capacidad = {}", v2.len(), v2.capacity());

    // Macro canónica para inicializar un vector con elementos.
    let mut v3 = vec![0, 0, 1, 2, 3, 4];

    // Conserva solo los elementos pares.
    v3.retain(|x| x % 2 == 0);
    println!("{v3:?}");

    // Elimina los duplicados consecutivos.
    v3.dedup();
    println!("{v3:?}");
}
```

Vec implementa Deref<Target = [T]>, lo que significa que puedes llamar a métodos slice en un Vec.

Vec es un tipo de colección, junto con String y HashMap. Los datos que contiene se almacenan en el heap. Esto significa que no es necesario conocer el tamaño de los datos durante la compilación. Puede aumentar o disminuir durante la ejecución.
Ten en cuenta que Vec<T> también es un tipo genérico, pero no tienes que especificar T de forma explícita. Como siempre sucede con la inferencia de tipos de Rust, T se estableció durante la primera llamada a push.
vec![...] es una macro canónica para usarla en lugar de Vec::new() y admite que se añadan elementos iniciales al vector.
Para indexar el vector, se utiliza [ ], pero entrará en pánico si se sale de los límites. También se puede usar get para obtener una Option. La función pop eliminará el último elemento.
Se estudiarán los slices el tercer día del curso. Por ahora, los participantes solo necesitan saber que un valor del tipo Vec también da acceso a
todos los métodos de slice documentados.
language&>es-ES<&