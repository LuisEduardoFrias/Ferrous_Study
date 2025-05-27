# Frameworks Móvil en Rust

Rust es un lenguaje excelente, y aunque es más joven que otros, su ecosistema de frameworks está creciendo rápidamente.

El desarrollo móvil con Rust es un área emergente, pero hay proyectos prometedores que te permiten construir aplicaciones nativas o casi nativas.

### Tauri - [web...](https://tauri.app/) - [doc...](https://tauri.app/v1/references/api/js/) - [github](https://github.com/tauri-apps/tauri)
Aunque no es un framework móvil "nativo" en el sentido tradicional, Tauri te permite construir aplicaciones multiplataforma (desktop y móvil) utilizando tecnologías web (HTML, CSS, JavaScript) para la interfaz de usuario y Rust para la lógica de backend. Genera binarios muy pequeños y eficientes.
   * Ventajas: Ligero, seguro, utiliza estándares web, ideal para aplicaciones donde la lógica compleja está en Rust.
   * Ideal para: Aplicaciones móviles que pueden beneficiarse de una interfaz web, pero que necesitan el rendimiento y la seguridad de Rust en el backend.

<br />
<br />

### Conrod - [doc...](https://docs.rs/conrod/latest/conrod/) - [github](https://github.com/PistonDevelopers/conrod)
Un framework de interfaz de usuario para Rust que se puede utilizar para construir aplicaciones multiplataforma, incluyendo móvil. Se centra en la renderización de gráficos y es más de bajo nivel que otros.
   * Ventajas: Control granular sobre la interfaz de usuario, buen rendimiento para gráficos.
   * Ideal para: Juegos simples, herramientas gráficas, aplicaciones donde se necesita un control preciso sobre la renderización.

<br />
<br />

### Dioxus - [web...](https://dioxuslabs.com/) - [doc...](https://docs.dioxuslabs.com/) - [github](https://github.com/DioxusLabs/dioxus)
Un framework de interfaz de usuario reactivo para Rust que se puede compilar a WebAssembly para la web, así como a binarios nativos para escritorio y móvil (experimentalmente). Su sintaxis es similar a React.
   * Ventajas: Reactivo, multiplataforma, buena ergonomía para UI declarativa.
   * Ideal para: Proyectos que buscan una única base de código para web, desktop y potencialmente móvil.

<br />
<br />

### Egregious - [github](https://github.com/rust-mobile/egregious) (Experimental/Emergente)
Un proyecto más experimental que busca proporcionar una forma de construir interfaces de usuario nativas para Android e iOS utilizando Rust. Todavía está en desarrollo activo, pero muestra el potencial de Rust en este espacio.
   * Ventajas: Potencial para aplicaciones nativas de alto rendimiento.
   * Ideal para: Desarrolladores que están a la vanguardia y dispuestos a explorar soluciones más experimentales para el desarrollo móvil nativo en Rust.

<br />
<br />

#### Consideraciones adicionales al elegir un framework

 * Madurez del Framework: Algunos frameworks son más maduros y tienen una comunidad más grande y recursos. Otros son más nuevos y pueden estar en desarrollo activo, lo que puede significar cambios más frecuentes.

 * Comunidad y Documentación: Una comunidad activa y una buena documentación son cruciales para aprender y resolver problemas.

 * Rendimiento: Rust es conocido por su rendimiento, pero el framework que elijas también afectará el rendimiento general de tu aplicación.

 * Estilo de Programación: Algunos frameworks favorecen un estilo de programación más funcional, mientras que otros son más orientados a objetos o imperativos. Elige uno que se alinee con tu forma de pensar.

 * Objetivos del Proyecto: Considera el tamaño y la complejidad de tu proyecto. Un framework ligero podría ser suficiente para un proyecto pequeño, mientras que un proyecto grande podría necesitar un framework más robusto.

Rust es un lenguaje versátil, y con esta lista, espero que tengas un buen punto de partida para explorar las muchas oportunidades de desarrollo que
ofrece.