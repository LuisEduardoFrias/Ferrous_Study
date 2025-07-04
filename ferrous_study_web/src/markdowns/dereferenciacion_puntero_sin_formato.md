---
key: 91
name: dereferenciacion_puntero_sin_formato
addData: 3/07/2025
updateData: null
keywords: 
 - dereferenciación
 - puntero sin formato
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Dereferenciación de Punteros Sin Formato
La creación de punteros es un proceso seguro, pero para anular las referencias, es necesario utilizar unsafe:

```rust
fn main() {
    let mut s = String::from("¡cuidado!");

    let r1 = &mut s as *mut String;
    let r2 = r1 as *const String;

    // SAFETY: r1 and r2 were obtained from references and so are guaranteed to
    // be non-null and properly aligned, the objects underlying the references
    // from which they were obtained are live throughout the whole unsafe
    // block, and they are not accessed either through the references or
    // concurrently through any other pointers.
    unsafe {
        println!("r1 es: {}", *r1);
        *r1 = String::from("oh, oh");
        println!("r2 es: {}", *r2);
    }

    // NO ES SEGURO. NO HAGAS ESTO.
    /*
    let r3: &String = unsafe { &*r1 };
    drop(s);
    println!("r3 is: {}", *r3);
    */
}
```

Se recomienda (y es obligatorio en la guía de estilo Rust de Android) escribir un comentario para cada bloque unsafe explicando cómo el código que contiene cumple los requisitos de seguridad de las operaciones inseguras que realiza.

En el caso de la desreferenciación de punteros, significa que los punteros deben ser válidos, por ejemplo:

El puntero no puede ser nulo.
El puntero debe ser desreferenciable (dentro de los límites de un único objeto asignado).
El objeto no debe haberse desasignado.
No debe haber accesos simultáneos a la misma ubicación.
Si el puntero se ha obtenido enviando una referencia, el objeto subyacente debe estar activo y no puede utilizarse ninguna referencia para acceder a la memoria.
En la mayoría de los casos, el puntero también debe estar alineado adecuadamente.

En la sección “INSEGURO” se muestra un ejemplo de un tipo común de error comportamiento indefinido: *r1 tiene el tiempo de vida 'static, por lo que r3 tiene el tipo &'static String y, por lo tanto, su duración es mayor que la de s. Para crear una referencia a partir de un puntero hay que tener mucho cuidado.
language&>es-ES<&