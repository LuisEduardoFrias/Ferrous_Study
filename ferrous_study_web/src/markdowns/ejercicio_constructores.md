---
key: 123
name: ejercicio_constructores
addData: 07/06/2025
updateData: null
keywords: 
 - ejercicio
 - constructores
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: Constructores
En este ejemplo, implementaremos un tipo de datos complejo que posee todos sus datos. Utilizaremos el “patrón de compilación” para permitir la compilación de un nuevo valor parte por parte mediante funciones prácticas.

Rellena las partes que faltan.

```rust
#[derive(Debug)]
enum Language {
    Rust,
    Java,
    Perl,
}

#[derive(Clone, Debug)]
struct Dependency {
    name: String,
    version_expression: String,
}

/// Una representación de un paquete de software.
#[derive(Debug)]
struct Package {
    name: String,
    version: String,
    authors: Vec<String>,
    dependencies: Vec<Dependency>,
    language: Option<Language>,
}

impl Package {
    /// Devuelve una representación de este paquete como una dependencia para usarla
    /// en la compilación de otros paquetes.
    fn as_dependency(&self) -> Dependency {
        todo!("1")
    }
}

/// Un compilador para un Package. Usa `build()` para crear el `Package`.
struct PackageBuilder(Package);

impl PackageBuilder {
    fn new(name: impl Into<String>) -> Self {
        todo!("2")
    }

    /// Define la versión del paquete.
    fn version(mut self, version: impl Into<String>) -> Self {
        self.0.version = version.into();
        self
    }

    /// Define los autores del paquete.
    fn authors(mut self, authors: Vec<String>) -> Self {
        todo!("3")
    }

    /// Añade una dependencia adicional.
    fn dependency(mut self, dependency: Dependency) -> Self {
        todo!("4")
    }

    /// Define el idioma. Si no se define, el idioma predeterminado será None.
    fn language(mut self, language: Language) -> Self {
        todo!("5")
    }

    fn build(self) -> Package {
        self.0
    }
}

fn main() {
    let base64 = PackageBuilder::new("base64").version("0.13").build();
    println!("base64: {base64:?}");
    let log =
        PackageBuilder::new("log").version("0.4").language(Language::Rust).build();
    println!("registro: {log:?}");
    let serde = PackageBuilder::new("serde")
        .authors(vec!["djmitche".into()])
        .version(String::from("4.0"))
        .dependency(base64.as_dependency())
        .dependency(log.as_dependency())
        .build();
    println!("serde: {serde:?}");
}
```

language&>es-ES<&