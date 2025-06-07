---
key: 112
name: read_write_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - read write
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Read y Write
Usando Read y BufRead, se puede abstraer sobre fuentes u8:

```rust
use std::io::{BufRead, BufReader, Read, Result};

fn count_lines<R: Read>(reader: R) -> usize {
    let buf_reader = BufReader::new(reader);
    buf_reader.lines().count()
}

fn main() -> Result<()> {
    let slice: &[u8] = b"foo\nbar\nbaz\n";
    println!("líneas en el slice: {}", count_lines(slice));

    let file = std::fs::File::open(std::env::current_exe()?)?;
    println!("líneas en el archivo: {}", count_lines(file));
    Ok(())
}
```

De forma similar, Write te permite abstraer sobre fuentes u8:

```rust
use std::io::{Result, Write};

fn log<W: Write>(writer: &mut W, msg: &str) -> Result<()> {
    writer.write_all(msg.as_bytes())?;
    writer.write_all("\n".as_bytes())
}

fn main() -> Result<()> {
    let mut buffer = Vec::new();
    log(&mut buffer, "Hola")?;
    log(&mut buffer, "mundo")?;
    println!("Registrado: {:?}", buffer);
    Ok(())
}
```

language&>es-ES<&