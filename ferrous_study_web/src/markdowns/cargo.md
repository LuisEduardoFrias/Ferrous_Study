---
key: 5
name: cargo
addData: 19/05/2025
updateData: null
keywords: 
 - cargo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Usando Cargo

Cargo es la herramienta estándar que se utiliza en el ecosistema de Rust para crear y ejecutar sus aplicaciones. En este artículo, te ofrecemos una breve descripción de lo que es Cargo, cómo se integra en el ecosistema más amplio y cómo encaja en esta formación.

## Instalación

Sigue las instrucciones que se indican en [https://rustup.rs/](https://rustup.rs/).

Esto te dará la herramienta de compilación Cargo (`cargo`) y el compilador Rust (`rustc`). También obtendrás `rustup`, una utilidad de línea de comandos que puedes utilizar para instalar diferentes versiones del compilador.

Después de instalar Rust, debes configurar tu editor o IDE para utilizar Rust.  Puedes usar  [rust-analyzer](https://rust-analyzer.github.io/), que ofrece funciones de autocompletado y salto a la definición para VS Code, Emacs y Vim/Neovim, entre otros. También hay disponible otro IDE denominado [RustRover](https://www.jetbrains.com/rust/).

En Debian o Ubuntu, también puedes instalar Cargo, el código fuente de Rust y el formateador de Rust a través de `apt`. Sin embargo, solo podrás conseguir una versión de Rust obsoleta que podría dar lugar a comportamientos inesperados. El comando es el siguiente:

```bash
sudo apt install cargo rust-src rustfmt
```

En macOS, puedes usar Homebrew para instalar Rust, pero esto podría proveer una versión anticuada. Por lo tanto, es recomendado instalar Rust del sitio oficial.

### Cargo en local
Si quieres experimentar con el código en tu propio sistema, primero tendrás que instalar Rust. Para ello, sigue las instrucciones del Libro de Rust. De este modo, obtendrás un rustc y un cargo que funcionen. En el momento de escribir esto, la última versión estable de Rust tiene estos números de versión:

```bash
rustc --version
rustc 1.69.0 (84c898d65 2023-04-16)

cargo --version
cargo 1.69.0 (6e9a83356 2023-04-12)
```

También puedes usar cualquier versión posterior, ya que Rust mantiene la retrocompatibilidad.

Una vez hecho lo anterior, sigue estos pasos para compilar un binario de Rust:

 * Usa **cargo new exercise** para crear un directorio exercise/ para tu código:
 
```bash
  cargo new exercise

  Created binary (application) `exercise` package
```

<br />

 * Ve a exercise/ y usa cargo run para compilar y ejecutar tu binario:

<br />

```bash
  cd exercise
  cargo run
   
  Compiling exercise v0.1.0 (/home/mgeisler/tmp/exercise)
  Finished dev [unoptimized + debuginfo] target(s) in 0.75s
  Running `target/debug/exercise`
  
  Hello, world!
```


 * Sustituye el código del archivo src/main.rs con tu propio código. 
Por ejemplo:
  
```bash
 fn main() {
    println!("¡Edítame!");
  }
```

 * Usa cargo run para hacer build y ejecutar tu binario actualizado:

```bash
  cargo run

  Compiling exercise v0.1.0 (/home/mgeisler/tmp/exercise)
  Finished dev [unoptimized + debuginfo] target(s) in 0.24s
  Running `target/debug/exercise`
  
  Editame!
```

Cargo ofrece varios comandos:

Imagina que estás construyendo algo con piezas. Cargo es como tu caja de herramientas y tu manual de instrucciones para Rust.

 * cargo check:  Es como revisar que todas tus piezas estén en su lugar y bien conectadas, pero sin armar nada todavía. Te dice si hay algún error antes de construir.

 * cargo build:  Este comando toma tus piezas y las arma. Crea el programa, pero no lo abre ni lo pone en funcionamiento.

 * cargo build --release:  Este comando también arma tu programa, pero lo hace de la mejor manera posible para que funcione rápido y ocupe menos espacio. La versión final y optimizada se guarda en target/release/.

Cargo también archivos como:

 * target/debug/: Aquí es donde Cargo guarda la versión de tu programa que es útil para cuando estás aprendiendo y probando. Es como un borrador que te permite ver los errores fácilmente.

 * Cargo.toml: Este archivo es como la lista de materiales de tu proyecto. Aquí le dices a Cargo qué otras "piezas" (llamadas dependencias, paquetes o crates) necesitas para que tu proyecto funcione.

 * Cuando usas comandos como cargo build, Cargo automáticamente busca y descarga esas "piezas" que listaste en Cargo.toml si aún no las tienes.

En resumen, Cargo te ayuda a revisar, construir y gestionar las "piezas" que necesita tu programa de Rust. ¡Es una herramienta muy útil!

Te animo a instalar Cargo y utilizar un editor local, te facilitará mucho las cosas, ya que dispondrás de un entorno de desarrollo normal.
language&>es-ES<&