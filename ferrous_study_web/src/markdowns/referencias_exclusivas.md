### Referencias exclusivas

Las referencias exclusivas, también denominadas referencias mutables, permiten cambiar el valor al que hacen referencia. Tienen el tipo &mut T.


Puntos clave:

“Exclusivo” significa que solo se puede utilizar esta referencia para acceder al valor. No pueden existir otras referencias (compartidas o exclusivas) al mismo tiempo y no se puede acceder al valor de referencia mientras exista la referencia exclusiva. Prueba a ejecutar un &point.0 o a cambiar point.0 mientras x_coord está activo.

Ten en cuenta la diferencia entre let mut x_coord: &i32 y let x_coord: &mut i32. La primera representa una referencia mutable que se puede vincular a distintos valores, mientras que la segu