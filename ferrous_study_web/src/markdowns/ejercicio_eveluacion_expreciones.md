---
key: 81
name: ejercicio_eveluacion_expreciones
addData: 06/06/2025
updateData: null
keywords: 
 - ejercicio
 - evaluacion
 - exprexiones
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Ejercicio: evaluación de expresiones
Vamos a escribir un sencillo evaluador recursivo de expresiones aritméticas.

El tipo Box es un puntero inteligente y lo veremos con detalle más adelante en el curso. Una expresión puede “estar delimitada” con Box::new, tal como se observa en las pruebas. Para evaluar una expresión delimitada, usa el operador de desreferencia (*) para “eliminar la delimitación”: eval(*boxed_expr).

Algunas expresiones no se pueden evaluar y devuelven un error. El tipo estándar Result<Value, String> es una enumeración que representa un valor correcto (Ok(Value)) o un error (Err(String)). Más adelante hablaremos de este tipo en profundidad.

Copia y pega el código en el playground de Rust y comienza a implementar eval. El producto final debe superar las pruebas. Recomendamos utilizar todo!() y hacer las pruebas para superar todas las pruebas de forma individual. También puedes saltarte una prueba de forma temporal con #[ignore]:

```bash
&>notplay
&>notcopy
#[test]
#[ignore]
fn test_value() { .. }
```

Si terminas antes, prueba a escribir una prueba que dé como resultado la división entre cero o un desbordamiento de números enteros. ¿Cómo podrías gestionarlo con Result en vez de con un pánico?

```rust
/// Operación que se puede llevar a cabo en dos subexpresiones.
#[derive(Debug)]
enum Operation {
    Add,
    Sub,
    Mul,
    Div,
}

/// Una expresión en forma de árbol.
#[derive(Debug)]
enum Expression {
    /// Operación en dos subexpresiones.
    Op { op: Operation, left: Box<Expression>, right: Box<Expression> },

    /// Un valor literal
    Value(i64),
}

fn eval(e: Expression) -> Result<i64, String> {
    todo!()
}

#[test]
fn test_value() {
    assert_eq!(eval(Expression::Value(19)), Ok(19));
}

#[test]
fn test_sum() {
    assert_eq!(
        eval(Expression::Op {
            op: Operation::Add,
            left: Box::new(Expression::Value(10)),
            right: Box::new(Expression::Value(20)),
        }),
        Ok(30)
    );
}

#[test]
fn test_recursion() {
    let term1 = Expression::Op {
        op: Operation::Mul,
        left: Box::new(Expression::Value(10)),
        right: Box::new(Expression::Value(9)),
    };
    let term2 = Expression::Op {
        op: Operation::Mul,
        left: Box::new(Expression::Op {
            op: Operation::Sub,
            left: Box::new(Expression::Value(3)),
            right: Box::new(Expression::Value(4)),
        }),
        right: Box::new(Expression::Value(5)),
    };
    assert_eq!(
        eval(Expression::Op {
            op: Operation::Add,
            left: Box::new(term1),
            right: Box::new(term2),
        }),
        Ok(85)
    );
}

#[test]
fn test_error() {
    assert_eq!(
        eval(Expression::Op {
            op: Operation::Div,
            left: Box::new(Expression::Value(99)),
            right: Box::new(Expression::Value(0)),
        }),
        Err(String::from("división entre cero"))
    );
}
```

language&>es-ES<&