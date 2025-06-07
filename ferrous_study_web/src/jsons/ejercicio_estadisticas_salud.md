---
key: 134
name: ejercicio_estadisticas_salud
addData: 07/06/2025
updateData: null
keywords: 
 - ejercicio
 - estadisticas de salud
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# Ejercicio: Estadísticas de Salud
Estás trabajando en la implementación de un sistema de monitorización de salud. Por ello, debes realizar un seguimiento de las estadísticas de salud de los usuarios.

Comenzarás con algunas funciones stub en un bloque impl, así como con una definición de estructura User. Tu objetivo es implementar métodos en el struct User definida en el bloque impl.

Copia el fragmento de código que aparece más abajo en la página a https://play.rust-lang.org/ y rellena el método que falta:

```rust
// TODO: borra esto cuando termines de implementarlo.
#![allow(unused_variables, dead_code)]


#![allow(dead_code)]
pub struct User {
    name: String,
    age: u32,
    height: f32,
    visit_count: usize,
    last_blood_pressure: Option<(u32, u32)>,
}

pub struct Measurements {
    height: f32,
    blood_pressure: (u32, u32),
}

pub struct HealthReport<'a> {
    patient_name: &'a str,
    visit_count: u32,
    height_change: f32,
    blood_pressure_change: Option<(i32, i32)>,
}

impl User {
    pub fn new(name: String, age: u32, height: f32) -> Self {
        Self { name, age, height, visit_count: 0, last_blood_pressure: None }
    }

    pub fn visit_doctor(&mut self, measurements: Measurements) -> HealthReport {
        todo!("Actualiza las estadísticas de un usuario en función de las mediciones obtenidas durante una consulta médica")
    }
}

fn main() {
    let bob = User::new(String::from("Bob"), 32, 155.2);
    println!("Me llamo {} y tengo {} años", bob.name, bob.age);
}

#[test]
fn test_visit() {
    let mut bob = User::new(String::from("Bob"), 32, 155.2);
    assert_eq!(bob.visit_count, 0);
    let report =
        bob.visit_doctor(Measurements { height: 156.1, blood_pressure: (120, 80) });
    assert_eq!(report.patient_name, "Bob");
    assert_eq!(report.visit_count, 1);
    assert_eq!(report.blood_pressure_change, None);

    let report =
        bob.visit_doctor(Measurements { height: 156.1, blood_pressure: (115, 76) });

    assert_eq!(report.visit_count, 2);
    assert_eq!(report.blood_pressure_change, Some((-5, -4)));
}
```

language&>es-ES<&