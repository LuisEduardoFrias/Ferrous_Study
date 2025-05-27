# Game engines en Rust

El ecosistema de desarrollo de juegos en Rust está en pleno crecimiento, y aunque no hay un "Unity" o "Unreal Engine" con todas las funciones y la madurez de décadas, hay proyectos muy prometedores y robustos.

Motores de Juego en Rust:

## Bevy Engine - [web](https://bevyengine.org/) - [doc](https://bevyengine.org/learn/) - [github](https://github.com/bevyengine/bevy)
Bevy es un motor de juego de datos refrescantemente simple y un marco de aplicación construido en Rust. Se destaca por su arquitectura de Sistema de Componentes de Entidades (ECS) de alto rendimiento, su diseño modular y su enfoque en la productividad del desarrollador. Permite el hot-reloading (recarga en caliente) de activos y código, lo que acelera el ciclo de iteración. Es una de las opciones más populares y de rápido crecimiento en el espacio de juegos de Rust.
   * Ideal para: Juegos 2D y 3D de varios tipos, desde pequeños prototipos hasta proyectos más ambiciosos. Su enfoque ECS lo hace muy flexible.

<br />

## Fyrox  <mark>&title>📄<title&Anteriormente conocido como rg3d</mark> - [web](https://fyrox.rs/) - [doc](https://fyrox.rs/docs/) - [github](https://github.com/FyroxEngine/Fyrox)
Fyrox es un motor de juego 3D con muchas características, construido en Rust. Ofrece un editor completo (similar a Unity o Godot) para desarrollar juegos de principio a fin. Soporta renderizado basado en física (PBR), tiene un potente sistema de audio, un avanzado sistema de interfaz de usuario y un sistema de animación. Es multiplataforma.
   * Ideal para: Juegos 2D y 3D, especialmente aquellos que buscan una experiencia de desarrollo más "out-of-the-box" con un editor visual.

<br />

## Piston - [web](https://www.piston.rs/) - [doc](https://docs.rs/piston/latest/piston/) <mark>&title>📄<title&Documentación de la API del crate principal, pero Piston es una colección de muchos crates </mark>- [github](https://github.com/PistonDevelopers/piston)
Piston es una colección de crates (librerías) modulares para el desarrollo de juegos en Rust. En lugar de ser un motor monolítico, Piston es más bien un "framework" que te da las herramientas para construir tu propio motor o juego desde cero, eligiendo los componentes que necesitas (renderizador, sistema de entrada, etc.). Es muy flexible y de bajo nivel.
   * Ideal para: Desarrolladores que quieren tener un control muy granular sobre todos los aspectos de su juego o que buscan construir su propio motor.

<br />

## Macroquad - [github](https://github.com/not-fl3/macroquad) <mark>&title>📄<title&La documentación y ejemplos están principalmente en el README de GitHub</mark>
Macroquad es una biblioteca simple y multiplataforma para el desarrollo de juegos 2D en Rust. Se enfoca en la simplicidad y la facilidad de uso, inspirada en la biblioteca Raylib. Es excelente para prototipos rápidos y juegos pequeños sin mucha sobrecarga de configuración.
   * Ideal para: Juegos 2D simples, prototipos, Game Jams, y para principiantes en el desarrollo de juegos con Rust.

<br />

## Ggez - [web](https://ggez.rs/) - [doc](https://docs.rs/ggez/latest/ggez/) - [github](https://github.com/ggez/ggez)
Ggez es una biblioteca de desarrollo de juegos 2D liviana y fácil de usar, inspirada en Love2D. Proporciona una API simple para gráficos, audio, entrada y manejo de estado. Es ideal para crear juegos 2D con un enfoque en la simplicidad y la diversión.
   * Ideal para: Juegos 2D casuales, prototipos, y aquellos que disfrutan de un estilo de desarrollo similar a Love2D.

<br />

## Ambient - [web](https://ambient.run/) - [github](https://github.com/AmbientRun/Ambient)
Ambient es un motor de juego multijugador diseñado para ser colaborativo. Está impulsado por Rust y WebGPU, lo que permite el desarrollo de juegos directamente en el navegador. Su enfoque principal es la creación de mundos 3D compartidos y experiencias en línea.
   * Ideal para: Juegos multijugador, experiencias colaborativas, o proyectos que buscan aprovechar el poder de WebGPU para gráficos en el navegador.

<br />

### Consideraciones sobre los Motores de Juego en Rust
 * Madurez: Aunque el ecosistema está creciendo, ninguno de estos motores tiene la misma madurez, cantidad de tutoriales o tamaño de comunidad que Unity o Godot. Requieren una mayor disposición a leer documentación, explorar ejemplos y, a veces, sumergirse en el código fuente.

 * Editor Visual: Fyrox se destaca por tener un editor visual completo. Bevy tiene un enfoque más programático, aunque la comunidad está trabajando en herramientas y editores. Otros motores son más bibliotecas que motores completos con un editor.

 * Comunidad: Bevy y Fyrox tienen comunidades bastante activas y están recibiendo una buena cantidad de desarrollo.

 * Rendimiento: Rust, por su naturaleza, ofrece un rendimiento excelente, lo que es crucial para los juegos. Los motores de Rust están diseñados para aprovechar esto al máximo.

Si estás interesado en el desarrollo de juegos con Rust, Bevy y Fyrox son excelentes puntos de partida si buscas un motor más completo, mientras que Macroquad o ggez son fantásticas opciones para empezar con juegos 2D o prototipos rápidos.
