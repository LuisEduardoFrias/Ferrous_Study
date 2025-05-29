---
key: 74
name: cohesion
addData: 28/05/2025
updateData: null
keywords: 
 - cohesión
 - diseño
 - software
 - responsabilidad única
 - alta cohesión
 - bajo acoplamiento
 - mantenimiento
 - reutilización
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
## Cohesión

La **cohesión** es un concepto fundamental en el diseño de software que mide qué tan **relacionados y enfocados** están los elementos dentro de un módulo, clase o componente. En otras palabras, se refiere a la **responsabilidad única** de una unidad de código. Un módulo con **alta cohesión** realiza una sola tarea bien definida o representa una entidad con responsabilidades muy relacionadas.

### Tipos de Cohesión (de la más débil a la más fuerte)

* **Cohesión Coincidental:** Las partes del módulo no tienen relación lógica entre sí. Es la peor forma de cohesión.
* **Cohesión Lógica:** Las partes se agrupan por una función lógica, pero no por una relación directa de datos (ej. una función que hace varias cosas, una u otra, según un parámetro).
* **Cohesión Temporal:** Las partes se agrupan porque se ejecutan en el mismo momento (ej. una función de inicialización que hace muchas cosas no relacionadas).
* **Cohesión Procedural:** Las partes se agrupan porque siguen una secuencia de operaciones (ej. un módulo que procesa un archivo, pero también valida y lo guarda).
* **Cohesión Comunicacional:** Las partes trabajan sobre el mismo conjunto de datos (ej. funciones que leen y escriben en la misma estructura de datos). Es una buena forma de cohesión.
* **Cohesión Secuencial:** La salida de una parte es la entrada de otra parte (ej. una función que formatea datos y otra que los imprime, donde la segunda usa la salida de la primera). Muy buena forma de cohesión.
* **Cohesión Funcional:** Todas las partes del módulo contribuyen a una única tarea bien definida y claramente delimitada. Es el tipo de cohesión **más deseable** y la base del principio de **Responsabilidad Única (SRP)** de SOLID.

<br />

### ¿Por qué es Importante la Alta Cohesión?

* **Mayor Facilidad de Mantenimiento:** Un módulo con alta cohesión es más fácil de entender, modificar y depurar, ya que todas sus partes están centradas en una única responsabilidad.
* **Mayor Reutilización:** Los módulos altamente cohesivos son componentes más autónomos y, por lo tanto, más fáciles de reutilizar en diferentes partes de la aplicación o en otros proyectos.
* **Reducción de Errores:** Al tener una responsabilidad clara, hay menos posibilidades de introducir efectos secundarios no deseados al realizar cambios.
* **Mejor Legibilidad y Comprensión:** El propósito de un módulo es obvio cuando tiene una alta cohesión.
<br />

language&>es-ES<&