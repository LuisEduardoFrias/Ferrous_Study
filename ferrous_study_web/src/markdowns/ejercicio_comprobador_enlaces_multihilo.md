---
key: 111
name: ejercicio_comprobador_enlaces_multihilo
addData: 3/07/2025
updateData: null
keywords: 
 - comprobador
 - 3nlaces multihilo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Comprobador de enlaces multihilo
Utilicemos nuestros nuevos conocimientos para crear un comprobador de enlaces multihilo. Debería empezar en una página web y comprobar que los enlaces de la página son válidos. Debería consultar otras páginas del mismo dominio y seguir haciéndolo hasta que todas las páginas se hayan validado.

For this, you will need an HTTP client such as reqwest. You will also need a way to find links, we can use scraper. Finally, we’ll need some way of handling errors, we will use thiserror.

Create a new Cargo project and reqwest it as a dependency with:

```bssh
cargo new link-checker
cd link-checker
cargo add --features blocking,rustls-tls reqwest
cargo add scraper
cargo add thiserror
```

Si cargo add da error: no such subcommand, edita el archivo Cargo.toml de forma manual. Añade las dependencias que se indican más abajo.

Las llamadas a cargo add actualizarán el archivo Cargo.toml para que tenga este aspecto:

```rust
[package]
name = "link-checker"
version = "0.1.0"
edition = "2021"
publish = false

[dependencies]
reqwest = { version = "0.11.12", features = ["blocking", "rustls-tls"] }
scraper = "0.13.0"
thiserror = "1.0.37"
```

Ya puedes descargar la página de inicio. Prueba con un sitio pequeño, como https://www.google.org/.

El archivo src/main.rs debería tener un aspecto similar a este:

```rust
use reqwest::blocking::Client;
use reqwest::Url;
use scraper::{Html, Selector};
use thiserror::Error;

#[derive(Error, Debug)]
enum Error {
    #[error("Error de solicitud: {0}")]
    ReqwestError(#[from] reqwest::Error),
    #[error("respuesta HTTP incorrecta: {0}")]
    BadResponse(String),
}

#[derive(Debug)]
struct CrawlCommand {
    url: Url,
    extract_links: bool,
}

fn visit_page(client: &Client, command: &CrawlCommand) -> Result<Vec<Url>, Error> {
    println!("Comprobando {:#}", command.url);
    let response = client.get(command.url.clone()).send()?;
    if !response.status().is_success() {
        return Err(Error::BadResponse(response.status().to_string()));
    }

    let mut link_urls = Vec::new();
    if !command.extract_links {
        return Ok(link_urls);
    }

    let base_url = response.url().to_owned();
    let body_text = response.text()?;
    let document = Html::parse_document(&body_text);

    let selector = Selector::parse("a").unwrap();
    let href_values = document
        .select(&selector)
        .filter_map(|element| element.value().attr("href"));
    for href in href_values {
        match base_url.join(href) {
            Ok(link_url) => {
                link_urls.push(link_url);
            }
            Err(err) => {
                println!("En {base_url:#}: {href:?} ignorado, no se puede analizar: {err}");
            }
        }
    }
    Ok(link_urls)
}

fn main() {
    let client = Client::new();
    let start_url = Url::parse("https://www.google.org").unwrap();
    let crawl_command = CrawlCommand{ url: start_url, extract_links: true };
    match visit_page(&client, &crawl_command) {
        Ok(links) => println!("Enlaces: {links:#?}"),
        Err(err) => println!("No se han podido extraer los enlaces: {err:#}"),
    }
}
```

Ejecuta el código en src/main.rs con

```bash
cargo run
```

Tasks
 - Comprueba los enlaces en paralelo con los hilos: envía las URLs que se van a comprobar a un canal y deja que varios hilos comprueben las URLs en paralelo.
 - Amplía esta opción para extraer enlaces de todas las páginas del dominio www.google.org. Define un límite máximo de 100 páginas para que el sitio no te bloquee.

language&>es-ES<&