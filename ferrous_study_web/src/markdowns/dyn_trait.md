---
key: 95
name: dyn_trait
addData: 06/06/2025
updateData: null
keywords: 
 - dyn trait
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
dyn Trait
En adición a ser usados para despacho estático con genéricos, los traits también se pueden usar para despacho dinámico/tipo-borrado con objetos de trait:

```rust
struct Dog {
    name: String,
    age: i8,
}
struct Cat {
    lives: i8,
}

trait Pet {
    fn talk(&self) -> String;
}

impl Pet for Dog {
    fn talk(&self) -> String {
        format!("¡Guau, me llamo {}!", self.name)
    }
}

impl Pet for Cat {
    fn talk(&self) -> String {
        String::from("¡Miau!")
    }
}

// Utiliza genéricos y despacho estático.
fn generic(pet: &impl Pet) {
    println!("Hola, quien eres? {}", pet.talk());
}

// Utiliza borradura de tipos y despacho dinámico.
fn dynamic(pet: &dyn Pet) {
    println!("Hola, quien eres? {}", pet.talk());
}

fn main() {
    let cat = Cat { lives: 9 };
    let dog = Dog { name: String::from("Fido"), age: 5 };

    generic(&cat);
    generic(&dog);

    dynamic(&cat);
    dynamic(&dog);
}
```

Genéricos, incluyendo impl Trait, utilizan monomorphización para crear una instancia especializada de la funcionan para cada tipo con el cual el genérico es instanciando. Esto significa que llamar un método de trait dentro de una función generica todavía usa despacho estático, ya que el compilador tiene todo la información necesaria para determinar el tipo cuya implementación debería de usar.

dyn Trait utiliza despacho dinámico con una tabla virtual de metodos (vtable). Esto significa que solo hay una sola version de fn dynamic que es utilizado independientemente del tipo de Pet que es proveído.

Cuando uno usa dyn Trait, el objeto trait necesita estar detrás algún tipo de indirección. En este caso es una referencia, pero tipos de puntador inteligentes como Box también pueden ser usados (demostraremos este durante el día 3).

Durante el tiempo de ejecución, un &dyn Pet es representado como un “puntador gordo”, es decir un par de dos puntadores: Un puntador apunta al objeto concreto que implementa Pet, y el otra apunta al vtable para la implementación del trait para ese tipo. Cuando uno llama el método talk sobre &dyn Pet, el compilador busca el puntador de función para talk en el vtable y ejecuta la función, pasando el puntador al Dog o Cat a esa función. El compilador no necesita saber el tipo concreto del Pet para hacer esto.

Un dyn Trait es considerado ser “tipo-borrado”, ya que no tenemos información sobre el tipo concreto del objeto al tiempo de compilación.
language&>es-ES<&