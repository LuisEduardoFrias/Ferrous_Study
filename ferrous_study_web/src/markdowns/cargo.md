# Usando Cargo

Cuando empieces a informarte sobre Rust, conocerás Cargo, la herramienta estándar que se utiliza en el ecosistema de Rust para crear y ejecutar sus aplicaciones. En este artículo, te ofrecemos una breve descripción de lo que es Cargo, cómo se integra en el ecosistema más amplio y cómo encaja en esta formación.

## Instalación

Sigue las instrucciones que se indican en [https://rustup.rs/](https://rustup.rs/).

Esto te dará la herramienta de compilación Cargo (`cargo`) y el compilador Rust (`rustc`). También obtendrás `rustup`, una utilidad de línea de comandos que puedes utilizar para instalar diferentes versiones del compilador.

Después de instalar Rust, debes configurar tu editor o IDE para utilizar Rust. La mayoría de los editores lo hacen con [rust-analyzer](https://rust-analyzer.github.io/), que ofrece funciones de autocompletado y salto a la definición para VS Code, Emacs y Vim/Neovim, entre otros. También hay disponible otro IDE denominado [RustRover](https://www.jetbrains.com/rust/).

En Debian o Ubuntu, también puedes instalar Cargo, el código fuente de Rust y el formateador de Rust a través de `apt`. Sin embargo, solo podrás conseguir una versión de Rust obsoleta que podría dar lugar a comportamientos inesperados. El comando es el siguiente:

```bash
sudo apt install cargo rust-src rustfmt
```

En macOS, puedes usar Homebrew para instalar Rust, pero esto podría proveer una versión anticuada. Por lo tanto, es recomendado instalar Rust del sitio oficial.

Local con Cargo
Si quieres experimentar con el código en tu propio sistema, primero tendrás que instalar Rust. Para ello, sigue las instrucciones del Libro de Rust. De este modo, obtendrás un rustc y un cargo que funcionen. En el momento de escribir esto, la última versión estable de Rust tiene estos números de versión:

```bash
rustc --version
rustc 1.69.0 (84c898d65 2023-04-16)

cargo --version
cargo 1.69.0 (6e9a83356 2023-04-12)
```

También puedes usar cualquier versión posterior, ya que Rust mantiene la retrocompatibilidad.

Una vez hecho lo anterior, sigue estos pasos para compilar un binario de Rust a partir de uno de los ejemplos de la formación:
 * Haz clic en el botón “Copiar en el portapapeles” del ejemplo que quieras copiar.
 * Usa cargo new exercise para crear un directorio exercise/ para tu código:
 
```bash
  cargo new exercise
```

  Created binary (application) `exercise` package

 * Ve a exercise/ y usa cargo run para compilar y ejecutar tu binario:

```bash
  cd exercise
  cargo run
   
  Compiling exercise v0.1.0 (/home/mgeisler/tmp/exercise)
  Finished dev [unoptimized + debuginfo] target(s) in 0.75s
  Running `target/debug/exercise`
  
  Hello, world!
```


 * Sustituye el código de plantilla en src/main.rs con tu propio código. Por ejemplo, usando el ejemplo de la página anterior, haz que src/main.rs tenga el siguiente aspecto:
  
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

Comprueba que no haya errores en el proyecto con cargo check. 

Compílalo sin ejecutarlo con cargo build.

Encontrarás la salida en target/debug/ para una versión de depuración normal. 

Usa cargo build --release para generar una compilación de lanzamiento optimizada en target/release/.

Edita Cargo.toml para añadir dependencias a tu proyecto.

Cuando ejecutes comandos cargo, se descargarán y compilarán automáticamente las dependencias que falten.

Te animo a instalar Cargo y utilizar un editor local, te facilitará mucho las cosas, ya que dispondrás de un entorno de desarrollo normal.