### Enums compartidas

Una referencia ofrece una forma de acceder a otro valor sin asumir la responsabilidad del valor. También se denomina “préstamo”. Las referencias compartidas son de solo lectura y los datos a los que se hace referencia no pueden cambiar.

Una referencia compartida a un tipo T tiene el tipo &T. Se crea un valor de referencia con el operador &. El operador * “desreferencia” una referencia, dando lugar a su valor.

Rust prohibirá estáticamente las referencias colgantes:

Se dice que una referencia “toma prestado” el valor al que hace referencia. Este es un buen modelo para los estudiantes que no están familiarizados con los punteros, ya que el código puede usar la referencia para acceder al valor, pero este sigue “perteneciendo” a la variable original. En el curso hablaremos con más profundidad sobre la propiedad el tercer día.

Las referencias se implementan como punteros y una ventaja clave es que pueden ser mucho más pequeñas del elemento al que apuntan. Los participantes que estén familiarizados con C o C++ reconocerán las referencias como punteros. A lo largo del curso, hablaremos sobre cómo Rust evita los errores de seguridad en la memoria derivados del uso de punteros sin formato.

Rust no crea referencias automáticamente, & siempre es obligatorio.

Rust realizará una desreferencia automática en algunos casos, en especial al invocar métodos (prueba ref_x.count_ones()). No hay necesidad para un operador -> como en C++.

En este ejemplo, r es mutable para que se pueda reasignar (r = &b). Debes tener en cuenta que se vuelve a enlazar r para que haga referencia a otro elemento. Es distinto de C++, donde la asignación a una referencia modifica el valor referenciado.

Una referencia compartida no permite modificar el valor al que hace referencia, incluso aunque el valor sea mutable. Prueba con *r = 'X'.

Rust hace un seguimiento del tiempo de vida de todas las referencias para asegurarse de que duran lo suficiente. En Rust seguro no se dan referencias colgantes. x_axis devolvería una referencia a point, pero point se desasignará cuando se devuelva la función, por lo que no se compilará.

Más adelante hablaremos de los préstamos cuando lleguemos a la parte de propiedad.