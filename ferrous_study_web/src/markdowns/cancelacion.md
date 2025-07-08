---
key: 125
name: cancelacion
addData: 3/07/2025
updateData: null
keywords: 
 - cancelación
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Cancelación
Si eliminas un futuro, no se podrá volver a sondear. Este fenómeno se denomina cancelación y puede producirse en cualquier momento de await. Hay que tener cuidado para asegurar que el sistema funcione correctamente, incluso cuando se cancelen los futuros. Por ejemplo, no debería sufrir interbloqueos o perder datos.

```rust
use std::io::{self, ErrorKind};
use std::time::Duration;
use tokio::io::{AsyncReadExt, AsyncWriteExt, DuplexStream};

struct LinesReader {
    stream: DuplexStream,
}

impl LinesReader {
    fn new(stream: DuplexStream) -> Self {
        Self { stream }
    }

    async fn next(&mut self) -> io::Result<Option<String>> {
        let mut bytes = Vec::new();
        let mut buf = [0];
        while self.stream.read(&mut buf[..]).await? != 0 {
            bytes.push(buf[0]);
            if buf[0] == b'\n' {
                break;
            }
        }
        if bytes.is_empty() {
            return Ok(None);
        }
        let s = String::from_utf8(bytes)
            .map_err(|_| io::Error::new(ErrorKind::InvalidData, "not UTF-8"))?;
        Ok(Some(s))
    }
}

async fn slow_copy(source: String, mut dest: DuplexStream) -> std::io::Result<()> {
    for b in source.bytes() {
        dest.write_u8(b).await?;
        tokio::time::sleep(Duration::from_millis(10)).await
    }
    Ok(())
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let (client, server) = tokio::io::duplex(5);
    let handle = tokio::spawn(slow_copy("hi\nthere\n".to_owned(), client));

    let mut lines = LinesReader::new(server);
    let mut interval = tokio::time::interval(Duration::from_millis(60));
    loop {
        tokio::select! {
            _ = interval.tick() => println!("tick!"),
            line = lines.next() => if let Some(l) = line? {
                print!("{}", l)
            } else {
                break
            },
        }
    }
    handle.await.unwrap()?;
    Ok(())
}
```

 - El compilador no ayuda con la seguridad de la cancelación. Debes leer la documentación de la API y tener en cuenta el estado de tu async fn.
 - A diferencia de panic y ?, la cancelación forma parte del flujo de control normal (en contraposición a la gestión de errores).
 - En el ejemplo se pierden partes de la cadena.
   - Cuando la rama tick() termina primero, se eliminan next() y su buf.
   - LinesReader se puede configurar para que no se cancele marcando buf como parte del struct:

```rust
struct LinesReader {
    stream: DuplexStream,
    bytes: Vec<u8>,
    buf: [u8; 1],
}

impl LinesReader {
    fn new(stream: DuplexStream) -> Self {
        Self { stream, bytes: Vec::new(), buf: [0] }
    }
    async fn next(&mut self) -> io::Result<Option<String>> {
        // prefijo buf y bytes con self.
        // ...
        let raw = std::mem::take(&mut self.bytes);
        let s = String::from_utf8(raw)
            .map_err(|_| io::Error::new(ErrorKind::InvalidData, "not UTF-8"))?;
        // ...
    }
}
```

 - Interval::tick es a prueba de cancelaciones, ya que registra si una marca se ha ‘entregado’.
 - AsyncReadExt::read es a prueba de cancelaciones porque o devuelve los datos o no los lee.
 - AsyncBufReadExt::read_line es similar al ejemplo y no está configurado a prueba de cancelaciones. Consulta su documentación para obtener información detallada y alternativas.

language&>es-ES<&