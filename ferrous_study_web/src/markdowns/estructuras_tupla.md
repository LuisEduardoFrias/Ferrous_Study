---
key: 40
name: estructuras_tupla
addData: 26/05/2025
updateData: null
keywords: 
 - estructura
 - tuplas
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Estructuras de tuplas

Si los nombres de los campos no son importantes, puedes utilizar una estructura de tuplas:

```rust
struct Point(i32, i32);

fn main() {
    let p = Point(17, 23);
    println!("({}, {})", p.0, p.1);
}
```

Esto se suele utilizar para envoltorios de campo único (denominados newtypes):

```rust
struct PoundsOfForce(f64);
struct Newtons(f64);

fn compute_thruster_force() -> PoundsOfForce {
    todo!("Pregunta a un científico aeroespacial de la NASA")
}

fn set_thruster_force(force: Newtons) {
    // ...
}

fn main() {
    let force = compute_thruster_force();
    set_thruster_force(force);
}
```

Los newtypes son una buena forma de codificar información adicional sobre el valor de un tipo primitivo, por ejemplo:
El número se mide en algunas unidades: Newtons en el ejemplo anterior.
El valor ha pasado alguna validación cuando se ha creado, por lo que ya no tendrás que volver a validarlo cada vez que lo uses: PhoneNumber(String) u OddNumber(u32).
Demuestra cómo se añade un valor f64 a un tipo Newtons accediendo al campo único del newtype.
Por lo general, a Rust no le gustan los elementos no explícitos, como el desenvolvimiento automático o, por ejemplo, el uso de booleanos como enteros.
El día 3 (genéricos), se explicará la sobrecarga del operador.
El ejemplo es una sutil referencia al fracaso de la sonda Mars Climate Orbiter.
language&>es-ES<&