---
key: 116
name: runtimes
addData: 3/07/2025
updateData: null
keywords: 
 - runtimes
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Runtimes (Tiempos de Ejecución)
Un runtime ofrece asistencia para realizar operaciones de forma asíncrona (un reactor) y es responsable de ejecutar futuros (un ejecutor). Rust no cuenta con un tiempo de ejecución “integrado”, pero hay varias opciones disponibles:
 - Tokio: eficaz, con un ecosistema bien desarrollado de funciones, como Hyper para HTTP o Tonic para usar gRPC.
 - async-std: se trata de un “std para async” e incluye un tiempo de ejecución básico en async::task.
 - smol: sencillo y ligero.

Varias aplicaciones de mayor tamaño tienen sus propios tiempos de ejecución. Por ejemplo, Fuchsia ya tiene uno.

Ten en cuenta que, de los tiempos de ejecución enumerados, el playground de Rust solo admite Tokio. El playground tampoco permite ningún tipo de E/S, por lo que la mayoría de elementos asíncronos interesantes no se pueden ejecutar. en él.

Los futuros son “inertes”, ya que no realizan ninguna acción (ni siquiera iniciar una operación de E/S) a menos que haya un ejecutor que los sondee. Muy diferente de las promesas de JavaScript, por ejemplo, que se ejecutan hasta su finalización, aunque nunca se utilicen.
language&>es-ES<&