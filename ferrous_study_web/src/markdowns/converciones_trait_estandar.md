---
key: 110
name: converciones_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - converciones
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Probando
Rust no tiene conversiones de tipo implícitas, pero admite conversiones explícitas con as. Por lo general, se definen según la semántica de C.

```rust
fn main() {
    let value: i64 = 1000;
    println!("ya que u16: {}", value as u16);
    println!("ya que i16: {}", value as i16);
    println!("ya que u8: {}", value as u8);
}
```

Los resultados de as se definen siempre en Rust y son coherentes en todas las plataformas. Es posible que no coincida con tu idea de cambiar el signo o convertirlo a otro de menor tamaño. Consulta los documentos y/o pregunta si tienes cualquier duda.

La conversión con as es una herramienta relativamente precisa y fácil de usar de forma incorrecta. Puede ser una fuente de pequeños errores, ya que los futuros trabajos de mantenimiento cambian los tipos que se usan o los intervalos de valores de los tipos. Las conversiones se utilizan únicamente cuando se quiere indicar un truncamiento incondicional (por ejemplo, seleccionando los 32 bits inferiores de un u64 con as u32, independientemente del elemento que se encontrase en los bits altos).

En el caso de las conversiones que no sean falibles (por ejemplo, u32 a u64), se recomienda utilizar From o Into en lugar de as para confirmar que la conversión es precisamente infalible. En el caso de las conversiones falibles, TryFrom y TryInto están disponibles cuando necesitas gestionar conversiones que se ajustan de forma diferente a las que no lo hacen.

Plantéate hacer una pausa después de esta diapositiva.

as es similar a una conversión estática de C++. En general, se desaconseja el uso de as en los casos en los que puedan perderse datos, o al menos se recomienda dejar un comentario explicativo.

Esto es habitual al convertir números enteros a usize para usarlos como índice.
language&>es-ES<&