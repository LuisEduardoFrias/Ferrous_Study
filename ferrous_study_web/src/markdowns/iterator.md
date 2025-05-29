---
key: 66
name: iterator
addData: 28/05/2025
updateData: null
keywords: 
 - comportamiento
 - iterador
 - colección
 - recorrido
 - acceso
 - secuencial
 - sin exponer estructura
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Iterator** (Iterador)
Es un patrón **de comportamiento** que proporciona una forma de acceder a los elementos de un objeto agregado secuencialmente sin exponer su representación subyacente. En otras palabras, permite recorrer los elementos de una colección (como una lista, un árbol o un mapa) sin que el código cliente necesite saber cómo está implementada internamente esa colección.

Imagina que tienes diferentes tipos de colecciones de elementos: una lista de clientes, un árbol de empleados, o un conjunto de productos. Cada una almacena sus datos de manera distinta. Si quieres escribir un código que simplemente "imprima cada elemento" sin importar el tipo de colección, sin un iterador tendrías que escribir código diferente para cada tipo de colección. El patrón Iterador te permite definir una interfaz común para recorrer todas estas colecciones.

 - title&>Este patrón **desacopla el algoritmo de recorrido de la colección que se está recorriendo**. Esto es fundamental porque:
 - **Simplifica el código del cliente:** El cliente solo necesita usar la interfaz del iterador, no los detalles internos de la colección.
 - **Permite diferentes recorridos:** Puedes implementar múltiples iteradores para la misma colección (por ejemplo, un iterador que recorre en orden normal y otro en orden inverso).
 - **Mejora la flexibilidad:** Puedes cambiar la implementación interna de una colección sin afectar el código que la recorre, siempre que el iterador siga siendo el mismo.

<br />

En Rust, el concepto de iterador está profundamente integrado en el lenguaje a través del **trait `Iterator`**, lo que lo hace muy idiomático y fácil de usar.

```rust
&title>Ejemplo de Iterator: Recorriendo una Colección de Libros Personalizada<title&
// El elemento que vamos a almacenar en nuestra colección
#[derive(Debug, Clone)]
struct Libro {
    titulo: String,
    autor: String,
    paginas: u32,
}

impl Libro {
    fn new(titulo: &str, autor: &str, paginas: u32) -> Self {
        Libro {
            titulo: titulo.to_string(),
            autor: autor.to_string(),
            paginas,
        }
    }
}

// Nuestra colección personalizada (el "objeto agregado")
struct Biblioteca {
    libros: Vec<Libro>, // Nuestra representación interna es un Vector
}

impl Biblioteca {
    fn new() -> Self {
        Biblioteca {
            libros: Vec::new(),
        }
    }

    fn add_libro(&mut self, libro: Libro) {
        self.libros.push(libro);
    }

    // Método para crear un iterador para nuestra Biblioteca
    fn crear_iterador(&self) -> BibliotecaIterador {
        BibliotecaIterador {
            coleccion: &self.libros, // El iterador recibe una referencia a la colección
            indice: 0,
        }
    }
}

// El Iterador Concreto para nuestra Biblioteca
// Implementa el trait `Iterator` de Rust
struct BibliotecaIterador<'a> {
    coleccion: &'a Vec<Libro>, // Referencia a la colección original
    indice: usize,
}

impl<'a> Iterator for BibliotecaIterador<'a> {
    // El tipo de los elementos que el iterador devuelve
    type Item = &'a Libro;

    // El método `next` es el corazón del iterador
    fn next(&mut self) -> Option<Self::Item> {
        if self.indice < self.coleccion.len() {
            let libro = &self.coleccion[self.indice];
            self.indice += 1;
            Some(libro)
        } else {
            None // No hay más elementos
        }
    }
}


fn main() {
    let mut mi_biblioteca = Biblioteca::new();
    mi_biblioteca.add_libro(Libro::new("Cien años de soledad", "Gabriel García Márquez", 496));
    mi_biblioteca.add_libro(Libro::new("1984", "George Orwell", 328));
    mi_biblioteca.add_libro(Libro::new("El Señor de los Anillos", "J.R.R. Tolkien", 1178));
    mi_biblioteca.add_libro(Libro::new("Don Quijote de la Mancha", "Miguel de Cervantes", 1000));

    println!("--- Recorriendo la biblioteca con un iterador personalizado ---");
    let iterador = mi_biblioteca.crear_iterador();

    for libro in iterador {
        println!("  Título: \"{}\", Autor: {}", libro.titulo, libro.autor);
    }

    println!("\n--- Recorriendo de nuevo (el iterador es un estado que se consume) ---");
    // Para recorrer de nuevo, necesitamos un nuevo iterador
    for libro in mi_biblioteca.crear_iterador() {
        println!("  Páginas: {} - {}", libro.paginas, libro.titulo);
    }

    println!("\n--- Demostración de iteradores de Rust integrados ---");
    // En Rust, colecciones como Vec ya implementan Iterator por defecto
    let numeros = vec![10, 20, 30, 40, 50];
    let mut suma = 0;
    for num in &numeros { // Usamos &numeros para obtener un iterador de referencias
        suma += num;
    }
    println!("Suma de números: {}", suma);

    // Los adaptadores de iteradores de Rust son muy poderosos
    println!("\n--- Uso de adaptadores de iteradores de Rust ---");
    numeros.iter() // Obtiene un iterador de referencias
           .filter(|&n| n > &25) // Filtra números mayores que 25
           .map(|&n| n * 2) // Duplica los números restantes
           .for_each(|n| println!("Número filtrado y duplicado: {}", n)); // Imprime cada uno
}
```

language&>es-ES<&