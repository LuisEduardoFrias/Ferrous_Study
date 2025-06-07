---
key: 116
name: revicion_memoria_programa
addData: 07/06/2025
updateData: null
keywords: 
 - revicion de memoria de programa
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Revisión de la memoria de programas
Los programas asignan memoria de dos formas:

Stack: Zona de memoria continua para las variables locales.

Los valores tienen tamaños fijos conocidos en tiempo de compilación.
Muy rápida: mueve el stack pointer.
Fácil de gestionar: sigue las llamadas de funciones.
Excelente localidad de memoria.
Heap: almacenamiento de valores fuera de las llamadas de funciones.

Los valores tienen tamaños dinámicos determinados en runtime.
Ligeramente más lento que el stack: requiere cierta trazabilidad.
No se puede asegurar la localidad de la memoria.
Ejemplo
Al crear un String, los metadatos de tamaño fijo se colocan en la stack y los datos de tamaño dinámico (la cadena real) en el heap:


```rust
fn main() {
    let s1 = String::from("Hola");
}
```

```bash
+------------------+     +-------------------------+
|      Stack       |     |           Heap          |
|------------------|     |-------------------------|
|  s1              |     |                         |
|  +------------+  |     |                         |
|  | capacity 5 |  |     |  +---+---+---+---+---+  |
|  | ptr      o |--|-----|->| H | e | l | l | o |  |
|  | len      5 |  |     |  +---+---+---+---+---+  |
|  +-----------+|  |     |                         |
|                  |     |                         |
+------------------+     +-------------------------+
```

Menciona que un String está respaldado por un Vec, por lo que tiene capacidad y longitud y, si es mutable, puede crecer mediante reasignación en el heap.

Si los alumnos lo preguntan, puedes mencionar que la memoria subyacente recibe una asignación de heap mediante el Asignador del Sistema y que se pueden implementar asignadores personalizados mediante el Allocator API.

Más información
Podemos inspeccionar la disposición de la memoria con código unsafe. Sin embargo, debes señalar que esto no es seguro.

```rust
fn main() {
    let mut s1 = String::from("Hola");
    s1.push(' ');
    s1.push_str("mundo");
    // ¡NO HAGÁIS ESTO EN CASA! Solo con fines educativos.
    // La cadena no proporciona garantías sobre su diseño, por lo que podría desencadenar
    // un comportamiento indefinido.
    unsafe {
        let (capacity, ptr, len): (usize, usize, usize) = std::mem::transmute(s1);
        println!("capacidad = {capacity}, ptr = {ptr:#x}, len = {len}");
    }
}
```

language&>es-ES<&