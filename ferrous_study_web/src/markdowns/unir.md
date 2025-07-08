---
key: 120
name: unir
addData: 3/07/2025
updateData: null
keywords: 
 - unir
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Unir
Una operación join espera hasta que todos los futuros estén listos y devuelve una colección de sus resultados. Es similar a Promise.all en JavaScript o asyncio.gather en Python.

```rust
use anyhow::Result;
use futures::future;
use reqwest;
use std::collections::HashMap;

async fn size_of_page(url: &str) -> Result<usize> {
    let resp = reqwest::get(url).await?;
    Ok(resp.text().await?.len())
}

#[tokio::main]
async fn main() {
    let urls: [&str; 4] = [
        "https://google.com",
        "https://httpbin.org/ip",
        "https://play.rust-lang.org/",
        "BAD_URL",
    ];
    let futures_iter = urls.into_iter().map(size_of_page);
    let results = future::join_all(futures_iter).await;
    let page_sizes_dict: HashMap<&str, Result<usize>> =
        urls.into_iter().zip(results.into_iter()).collect();
    println!("{:?}", page_sizes_dict);
}
```

Copia este ejemplo en el archivo src/main.rs que has preparado y ejecútalo desde ahí.
 - En el caso de varios futuros de tipos distintos, puedes utilizar std::future::join!, pero debes saber cuántos futuros tendrás en el tiempo de compilación. Esto se encuentra actualmente en el crate futures, que pronto se estabilizará en std::future.
 - The risk of join is that one of the futures may never resolve, this would cause your program to stall.
 - También puedes combinar join_all con join!, por ejemplo, para unir todas las solicitudes a un servicio HTTP, así como una consulta a la base de datos. Prueba a añadir un tokio::time::sleepal futuro mediantefutures::join!. No se trata de un tiempo de espera (para eso se requiere select!, que se explica en el siguiente capítulo), sino que muestra join!`.
language&>es-ES<&