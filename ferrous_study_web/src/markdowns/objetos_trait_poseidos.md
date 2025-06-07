---
key: 127
name: objetos_trait_poseidos
addData: 07/06/2025
updateData: null
keywords: 
 - objetos de trait poseidos
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Objetos Trait Poseídos
Previamente vimos que objetos de trait se pueden usar con referencias, e.g. &dyn Pet. También podemos usar objetos de trait con punteros inteligentes como Box para crear objetos de trait con dueño: Box<dyn Pet>.

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

fn main() {
    let pets: Vec<Box<dyn Pet>> = vec![
        Box::new(Cat { lives: 9 }),
        Box::new(Dog { name: String::from("Fido"), age: 5 }),
    ];
    for pet in pets {
        println!("Hola, quien eres? {}", pet.talk());
    }
}
```

Diseño de la memoria después de asignar pets:

```bash
&>notcopy
&>notplay
+-----------------------------------+       +------------------------------------------------+
|               Stack               |       |                     Heap                       |  
|-----------------------------------|       |------------------------------------------------| 
|   pets: Vec<dyn Pet>              |       |  data: Cat                                     |
|   +-------------------+           |       |  +--------+-------+         +---+---+---+---+  |
|   | ptr             o-|-----------|---+   |  | lives  |   9   |         | f | i | d | o |  |
|   | len             2 |           |   |   |  +--------+-------+         +---+---+---+---+  |
|   | capacity        2 |           |   |   |        ^                      ^                |
|   +-------------------+           |   |   |        |                      |                |
+-----------------------------------+   |   |        |                      +---+            |
                                        |   |        |             data: Dog    |            |
                                        |   |        |             +-------+----|---------+  |
                                        |   |   +------+------+    | name  |    o , 4 , 4 |  |
                                        +---|-->| o  o | o  o-|--->| age   |            5 |  |
                                            |   +------+------+    +-------+--------------+  |
                                            |     |      |                                   |
                                            +-----|------|-----------------------------------+
                                                  |      |           
                                                  |      |                        program text
                                            +-----|------|-----------------------------------+
                                            |     |      |        vtable                     |
                                            |     |      |     +----------------------+      |
                                            |     |      +---->| <Dog as Pert>::talk  |      |
                                            |     |            +----------------------+      |
                                            |     |               vtable                     |
                                            |     |            +----------------------+      |
                                            |     +----------->| <Cat as Pert>::talk  |      |
                                            |                  +----------------------+      |
                                            |                                                |
                                            +------------------------------------------------+
```

Los tipos que implementan un trait pueden tener diferentes tamaños. Esto hace imposible tener elementos como Vec<dyn Pet> en el ejemplo anterior.
dyn Pet es una forma de indicar al compilador un tipo de tamaño dinámico que implementa Pet.
En este ejemplo, pets es alocado sobre el stack y los datos del vector sobre el heap. Los dos elementos del vector son punteros gordos:
Un puntero gordo es un puntero de tamaño doble. Tiene dos componentes: un puntero al objeto y un puntero a la tabla virtual de métodos (vtable) para la implementación de Pet de ese objeto.
Los datos para el Dog llamado Fido son los campos name y age. El Cat tiene un campo lives.
Compara estas salidas en el ejemplo anterior:

```rust
println!("{} {}", std::mem::size_of::<Dog>(), std::mem::size_of::<Cat>());
println!("{} {}", std::mem::size_of::<&Dog>(), std::mem::size_of::<&Cat>());
println!("{}", std::mem::size_of::<&dyn Pet>());
println!("{}", std::mem::size_of::<Box<dyn Pet>>());
```

language&>es-ES<&