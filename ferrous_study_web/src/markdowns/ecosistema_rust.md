---
key: 4
name: ecosistema_rust
addData: 19/05/2025
updateData: null
keywords: 
 - rust
 - rustc
 - cargo
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El ecosistema de Rust

El ecosistema de Rust se compone de varias herramientas, entre las que se incluyen las siguientes:

* **rustc**: El compilador de Rust que convierte archivos `.rs` en binarios y otros formatos intermedios.
* **cargo**: Herramienta de compilación y gestión de dependencias de Rust. Cargo sabe cómo descargar dependencias, que normalmente se alojan en <https://crates.io>, y las transfiere a `rustc` al crear el proyecto. Cargo también incorpora un ejecutor de pruebas que se utiliza para realizar pruebas unitarias.
* **rustup**: El instalador y actualizador de cadenas de herramientas de Rust. Esta herramienta se utiliza para instalar y actualizar `rustc` y `cargo` cuando se lanzan nuevas versiones de Rust. Además, `rustup` también puede descargar documentación de la biblioteca estándar. Puedes tener varias versiones de Rust instaladas a la vez y `rustup` te permitirá cambiar de una a otra según lo necesites.

### Puntos clave:

* Rust cuenta con un programa de lanzamiento rápido en el que se publica una nueva versión cada seis semanas. Las nuevas versiones mantienen la retrocompatibilidad con las versiones anteriores, además de habilitar nuevas funciones.
* Hay tres canales de lanzamiento: “stable”, “beta” y “nightly”.
* Las funciones nuevas se prueban en “nightly”, y “beta” es lo que se convierte en “estable” cada seis semanas.
* Las dependencias también pueden resolverse desde [registros] alternativos, git, carpetas, etc.
* Rust también tiene varias [ediciones]: la más actual es Rust 2021. Las ediciones anteriores son Rust 2015 y Rust 2018.
* Las ediciones pueden introducir cambios de incompatibilidad con versiones anteriores en el lenguaje.
* Para evitar que se rompa el código, las ediciones son opcionales: selecciona la edición para tu crate a través del archivo `Cargo.toml`.
* Para evitar la división del ecosistema, los compiladores de Rust pueden mezclar el código escrito para distintas ediciones.
* Hay que mencionar que es bastante raro utilizar el compilador directamente y no a través de `cargo` (la mayoría de los usuarios nunca lo hacen).
* Vale la pena mencionar que Cargo en sí es una herramienta extremadamente poderosa e integral. Es capaz de hacer muchas cosas avanzadas y no limitadas a:
    * Estructura del proyecto/paquete
    * Workspaces
    * Manejo/Cache de Dependencias de Desarrollo y de Runtime
    * Build scripting
    * Instalación global
* También es extensible con plugins de subcomandos (como `cargo clippy`).
* Consulta más información en el [libro oficial de Cargo](https://doc.rust-lang.org/cargo/).
language&>es-ES<&