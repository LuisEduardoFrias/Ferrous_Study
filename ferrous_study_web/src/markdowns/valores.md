---
key: 8
name: valores
addData: 19/05/2025
updateData: null
keywords: 
 - valores
 - tipos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Valores y tipos de datos
A continuación, se muestran algunos tipos integrados básicos, así como la sintaxis de los valores literales de cada tipo.

<hr />

|                                             |  Tipos                                     |  Literales |
|-----------------------------|------------------------------|----------|
| Enteros con signo                | i8, i16, i32, i64, i128, isize       | 0, 123, 10_u16  |
| Enteros sin signo                 | u8, u16, u32, u64, u128, usize |  -10.0e20, 2_f32 |
| Números de coma flotante  | f32, f64	3.14                         |  -10, 0, 1_000, 123_i64 |
| Valores escalares Unicode   | char                                        | 'a', 'α', '∞' |
| Booleanos                            | bool                                        | true, false |

<hr />

Los tipos tienen la siguiente anchura:

- iN, uN, and fN son N bits de capacidad,
- isize y usize tienen el ancho de un puntero, 
- char tiene un tamaño de 32 bits,
- bool tiene 8 bits de ancho.

Hay algunas sintaxis que no se han mostrado anteriormente:

Todos guiones bajos en los números pueden no utilizarse, ya que solo sirven para facilitar la lectura. Por lo tanto, 1000 se puede escribir como 1_000 (o 10_00), y 123i64 se puede escribir como 123_i64.

Consideraciones sobre isize y usize, ambos dependen de la arquitectura del sistema en el que se está ejecutando el código. Generalmente, se utilizan para indexar colecciones o representar tamaños de memoria. Usar estos tipos es apropiado cuando estás trabajando con la memoria directamente o con estructuras de datos cuyo tamaño depende de la arquitectura.
language&>es-ES<&