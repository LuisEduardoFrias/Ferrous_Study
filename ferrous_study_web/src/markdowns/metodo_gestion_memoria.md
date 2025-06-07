---
key: 117
name: metodo_gestion_memoria
addData: 07/06/2025
updateData: null
keywords: 
 - metodo de gestion de memoria
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Métodos de Gestión de Memoria
Tradicionalmente, los lenguajes se dividen en dos grandes categorías:

Control total a través de la gestión manual de la memoria: C, C++, Pascal, etc.
El programador decide cuándo asignar o liberar memoria del montículo.
El programador debe determinar si un puntero aún apunta a una memoria válida.
Los estudios demuestran que los programadores cometen errores.
Seguridad total mediante la gestión automática de la memoria en runtime: Java, Python, Go, Haskell, etc.
Un sistema de tiempo de ejecución asegura que la memoria no se libera hasta que ya no se pueda hacer referencia a ella.
Normalmente se implementa con un contador de referencias, la recolección de elementos no utilizados o RAII.
Rust ofrece una mezcla de ambas:

Control completo y seguridad completa gracias a que el compilador se encarga del manejo correcto de la memoria.

Para ello, se utiliza un concepto de ownership (propiedad) explícito.

Speaker Notes
This slide should take about 10 minutes.
El objetivo de esta diapositiva es ayudar a los estudiantes de otros lenguajes a entender mejor Rust.

C debe gestionar el montículo de forma manual con malloc y free. Entre los errores habituales se incluyen olvidarse de llamar a free, llamarlo varias veces para el mismo puntero o desreferenciar un puntero después de que se haya liberado la memoria a la que apunta.

C++ tiene herramientas como los punteros inteligentes (unique_ptr y shared_ptr) que aprovechan las garantías del lenguaje sobre la llamada a destructores para garantizar que la memoria se libere cuando se devuelva una función. Sin embargo, es fácil hacer un uso inadecuado de estas herramientas y crear errores similares a los de C.

Java, Go y Python utilizan el recolector de elementos no utilizados para identificar la memoria a la que ya no se puede acceder y descartarla. Esto asegura que se pueda desreferenciar cualquier puntero, de forma que se eliminan los errores use-after-free y otros tipos de errores. Sin embargo, el recolector de elementos no utilizados tiene un coste de tiempo de ejecución y es difícil ajustarlo adecuadamente.

El modelo de propiedad y préstamo de Rust puede, en muchos casos, permitir obtener el rendimiento de C, con operaciones asignadas y libres donde se
necesiten y sin coste. También proporciona herramientas similares a los punteros inteligentes de C++. Si es necesario, hay disponibles otras opciones,
como el recuento de referencias, e incluso hay crates de terceros que admiten la recolección de elementos no utilizados del tiempo de ejecución (estos
elementos no se tratan en esta clase).
language&>es-ES<&