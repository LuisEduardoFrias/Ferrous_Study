---
key: 111
name: expreciones_lambda_trait_estandar
addData: 06/06/2025
updateData: null
keywords: 
 - expreciones lambda
 - traits estamdar
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
Cierres
Los cierres o expresiones lambda tienen tipos que no pueden nombrarse. Sin embargo, implementan traits especiales Fn, FnMut y FnOnce:

```rust
fn apply_with_log(func: impl FnOnce(i32) -> i32, input: i32) -> i32 {
    println!("Llamado función sobre {input}");
    func(input)
}

fn main() {
    let add_3 = |x| x + 3;
    println!("add_3: {}", apply_with_log(add_3, 10));
    println!("add_3: {}", apply_with_log(add_3, 20));

    let mut v = Vec::new();
    let mut accumulate = |x: i32| {
        v.push(x);
        v.iter().sum::<i32>()
    };
    println!("accumulate: {}", apply_with_log(&mut accumulate, 4));
    println!("accumulate: {}", apply_with_log(&mut accumulate, 5));

    let multiply_sum = |x| x * v.into_iter().sum::<i32>();
    println!("multiply_sum: {}", apply_with_log(multiply_sum, 3));
}
```
Un Fn (por ejemplo, add_3) no consume ni modifica los valores capturados, o quizá no captura nada en absoluto. Se puede llamar varias veces al mismo tiempo.

Un FnMut (por ejemplo, accumulate) puede modificar los valores capturados. Se puede llamar varias veces, pero no de forma simultánea.

Si tienes un FnOnce (por ejemplo, multiply_sum), solo puedes llamarlo una vez. Puede consumir valores capturados.

FnMut es un subtipo de FnOnce, mientras que Fn es un subtipo de FnMut y FnOnce. Es decir, puedes utilizar un FnMut siempre que se llame a un FnOnce, y puedes usar un Fn siempre que se llame a un FnMut o a un FnOnce.

Cuando defines una función que admite un closure, debes usar FnOnce si es posible (es decir, se llama una vez) o, en su defecto, FnMut. En último lugar estaría Fn. De esta forma, se ofrece la máxima flexibilidad al llamador.

Por el contrario, cuando tienes un cierre (closure), lo más flexible que puedes tener es Fn (se puede transmitir en todas partes), a continuación FnMut y, por último, FnOnce.

El compilador también infiere Copy (por ejemplo, add_3) y Clone (por ejemplo, multiply_sum), dependiendo de lo que capture el cierre.

De forma predeterminada, los cierres capturan, si pueden, por referencia. La palabra clave move hace que capturen por valor.

```rust
fn make_greeter(prefix: String) -> impl Fn(&str) {
    return move |name| println!("{} {}", prefix, name);
}

fn main() {
    let hi = make_greeter("¿Qué".to_string());
    hi("Greg");
}
```

language&>es-ES<&