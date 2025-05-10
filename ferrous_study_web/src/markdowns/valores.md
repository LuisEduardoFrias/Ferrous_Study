Valores
A continuación, se muestran algunos tipos integrados básicos, así como la sintaxis de los valores literales de cada tipo.

Tipos	Literales
Enteros con signo	i8, i16, i32, i64, i128, isize	-10, 0, 1_000, 123_i64
Enteros sin signo	u8, u16, u32, u64, u128, usize	0, 123, 10_u16
Números de coma flotante	f32, f64	3.14, -10.0e20, 2_f32
Valores escalares Unicode	char	'a', 'α', '∞'
Booleanos	bool	true, false
Los tipos tienen la siguiente anchura:

iN, uN, and fN son N bits de capacidad,
isize y usize tienen el ancho de un puntero,
char tiene un tamaño de 32 bits,
bool tiene 8 bits de ancho.
Speaker Notes
This slide should take about 5 minutes.
Hay algunas sintaxis que no se han mostrado anteriormente:

Todos guiones bajos en los números pueden no utilizarse, ya que solo sirven para facilitar la lectura. Por lo tanto, 1_000 se puede escribir como 1000
(o 10_00), y 123_i64 se puede escribir como 123i64.