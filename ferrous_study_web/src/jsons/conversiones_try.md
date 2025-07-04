---
key: 85
name: conversiones_try
addData: 3/07/2025
updateData: null
keywords: 
 - conversiones try
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Conversiones Try (Intentar)
La expansión efectiva de ? es un poco más complicada de lo que se ha indicado anteriormente:

```rust
expression?
```

funciona igual que

```rust
match expression {
    Ok(value) => value,
    Err(err)  => return Err(From::from(err)),
}
```

The From::from call here means we attempt to convert the error type to the type returned by the function. This makes it easy to encapsulate errors into higher-level errors.

## Ejemplo

```rust
use std::error::Error;
use std::fmt::{self, Display, Formatter};
use std::fs::File;
use std::io::{self, Read};

#[derive(Debug)]
enum ReadUsernameError {
    IoError(io::Error),
    EmptyUsername(String),
}

impl Error for ReadUsernameError {}

impl Display for ReadUsernameError {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        match self {
            Self::IoError(e) => write!(f, "Error IO: {e}"),
            Self::EmptyUsername(path) => write!(f, "No se ha encontrado ningún nombre de usuario en {path}"),
        }
    }
}

impl From<io::Error> for ReadUsernameError {
    fn from(err: io::Error) -> Self {
        Self::IoError(err)
    }
}

fn read_username(path: &str) -> Result<String, ReadUsernameError> {
    let mut username = String::with_capacity(100);
    File::open(path)?.read_to_string(&mut username)?;
    if username.is_empty() {
        return Err(ReadUsernameError::EmptyUsername(String::from(path)));
    }
    Ok(username)
}

fn main() {
    //std::fs::write("config.dat", "").unwrap();
    let username = read_username("config.dat");
    println!("nombre de usuario o error: {username:?}");
}
```

El operador ? debe devolver un valor compatible con el tipo de resultado devuelto de la función. En Result, significa que los tipos de error deben ser compatibles. Una función que devuelve Result<T, ErrorOuter> solo puede usar ? en un valor del tipo Result<U, ErrorInner> si ErrorOuter y ErrorInner son del mismo tipo o si ErrorOuter implementa . From<ErrorInner>.

Una alternativa habitual a la implementación From es Result::map_err, sobre todo si la conversión solo se produce en un lugar.

No hay ningún requisito de compatibilidad para Option. Una función que devuelve Option<T> puede usar el operador ? en Option<U> para tipos arbitrarios de T y U.

Una función que devuelve Result no puede usar ? en Option y viceversa. Sin embargo, Option::ok_or convierte Option en Result, mientras que Result::ok convierte Result en Option.


language&>es-ES<&