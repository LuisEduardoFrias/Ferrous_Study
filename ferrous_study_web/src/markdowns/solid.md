---
key: 76
name: solid
addData: 28/05/2025
updateData: null
keywords: 
 - solid
 - principios
 - diseño
 - software
 - responsabilidad única
 - abierto cerrado
 - sustitución liskov
 - segregación interfaz
 - inversión dependencia
 - POO
 - limpio
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
## Principios SOLID

**SOLID** es un acrónimo que representa cinco principios de diseño de software propuestos por Robert C. Martin (Uncle Bob). Estos principios son fundamentales en la programación orientada a objetos (POO) y están destinados a hacer que los diseños de software sean más comprensibles, flexibles, mantenibles y, por lo tanto, más fáciles de escalar y de evitar "malos olores" en el código.

Cada letra de SOLID representa un principio:

### S - Principio de Responsabilidad Única (Single Responsibility Principle - SRP)

* **Concepto:** Una clase (o módulo) debe tener solo **una razón para cambiar**. Esto significa que debe tener una única responsabilidad bien definida.
* **Beneficios:** Aumenta la cohesión de la clase y reduce el acoplamiento. Hace que el código sea más fácil de entender y mantener.

<br />

### O - Principio Abierto/Cerrado (Open/Closed Principle - OCP)

* **Concepto:** Las entidades de software (clases, módulos, funciones, etc.) deben estar **abiertas para extensión, pero cerradas para modificación**. Esto significa que puedes añadir nuevas funcionalidades sin alterar el código existente que ya funciona.
* **Beneficios:** Promueve la estabilidad del código, facilita la adición de nuevas características y reduce el riesgo de introducir errores en el código existente. A menudo se logra mediante el uso de interfaces y abstracciones.

<br />

### L - Principio de Sustitución de Liskov (Liskov Substitution Principle - LSP)

* **Concepto:** Si un programa utiliza un tipo base, entonces debe poder utilizar cualquier subtipo de ese tipo base sin que el programa se rompa. Es decir, los objetos de una superclase deben poder ser sustituidos por objetos de sus subclases sin afectar la corrección del programa.
* **Beneficios:** Garantiza que la herencia se utilice correctamente y que las subclases no alteren el comportamiento esperado de la superclase, manteniendo la robustez y la previsibilidad del sistema.

<br />

### I - Principio de Segregación de la Interfaz (Interface Segregation Principle - ISP)

* **Concepto:** Los clientes no deben ser forzados a depender de interfaces que no utilizan. Es mejor tener muchas interfaces pequeñas y específicas de cliente que una interfaz grande y monolítica.
* **Beneficios:** Evita que las clases implementen métodos irrelevantes, reduciendo el acoplamiento no deseado y haciendo que las interfaces sean más manejables y reutilizables.

<br />

### D - Principio de Inversión de Dependencias (Dependency Inversion Principle - DIP)

* **Concepto:**
    1.  Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones.
    2.  Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones.
* **Beneficios:** Desacopla las implementaciones concretas de la lógica de alto nivel, lo que lleva a sistemas más flexibles, fáciles de probar y con mayor capacidad de evolución. Este principio es la base para patrones como la Inyección de Dependencias.

<br />

### ¿Por qué son importantes los Principios SOLID?

* **Mejora de la Calidad del Código:** Conducen a un código más limpio, modular y fácil de entender.
* **Facilidad de Mantenimiento:** Reducen el esfuerzo y el riesgo al realizar cambios en el software.
* **Mayor Flexibilidad y Extensibilidad:** Facilitan la adición de nuevas características sin romper las existentes.
* **Fomento de la Reutilización:** Los componentes bien diseñados son más propensos a ser reutilizados.
* **Reducción de la Complejidad:** Descomponen el sistema en partes más pequeñas y manejables.
<br />
language&>es-ES<&