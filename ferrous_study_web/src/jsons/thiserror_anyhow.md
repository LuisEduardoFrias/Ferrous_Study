---
key: 87
name: thiserror_anyhow
addData: 3/07/2025
updateData: null
keywords: 
 - thiserror anyhow
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# thiserror y anyhow
The thiserror and anyhow crates are widely used to simplify error handling.

thiserror se suele usar en bibliotecas para crear tipos de errores personalizados que implementan From<T>.
Las aplicaciones suelen utilizar anyhow para gestionar errores en funciones, como añadir información contextual a los errores.

```rust
use anyhow::{bail, Context, Result};
use std::fs;
use std::io::Read;
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, PartialEq)]
#[error("No se ha encontrado ningún nombre de usuario en {0}")]
struct EmptyUsernameError(String);

fn read_username(path: &str) -> Result<String> {
    let mut username = String::with_capacity(100);
    fs::File::open(path)
        .with_context(|| format!("No se ha podido abrir {path}"))?
        .read_to_string(&mut username)
        .context("No se ha podido leer")?;
    if username.is_empty() {
        bail!(EmptyUsernameError(path.to_string()));
    }
    Ok(username)
}

fn main() {
    //fs::write("config.dat", "").unwrap();
    match read_username("config.dat") {
        Ok(username) => println!("Nombre de usuario: {username}"),
        Err(err) => println!("Error: {err:?}"),
    }
}
```

## thiserror
 - La macro de derivación Error la proporciona thiserror y ofrece muchos atributos útiles para definir los tipos de error de forma compacta.
 - El trait std::error::Error se deriva automáticamente.
 - El mensaje de #[error] se usa para derivar el trait Display.

## anyhow
 - anyhow::Error es básicamente un envoltorio alrededor de Box<dyn Error>. Como tal, no suele ser una buena elección para la API pública de una biblioteca, pero se usa con frecuencia en aplicaciones.
 - anyhow::Result<V> es un alias de tipo para Result<V, anyhow::Error>.
 - El tipo de error real que contiene se puede extraer para analizarlo si es necesario.
 - La funcionalidad proporcionada por anyhow::Result<T> puede resultar familiar a los desarrolladores de Go, ya que ofrece patrones de uso y ergonomía similares a (T, error) de Go.
 - anyhow::Context es un trait implementado para los tipos estándar Result y Option. Se necesita use anyhow::Context para habilitar .context() y .with_context() en esos tipos.

language&>es-ES<&