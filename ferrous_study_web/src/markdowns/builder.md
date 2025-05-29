---
key: 53
name: builder
addData: 28/05/2025
updateData: null
keywords: 
 - creacional
 - construcción de objetos
 - objeto complejo
 - paso a paso
 - representación
 - inmutable
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El patrón de diseño **Builder** (Constructor)
Es un patrón **creacional** que te permite construir objetos complejos paso a paso. A diferencia de un constructor tradicional que se encarga de la creación de un objeto en una sola llamada, el Builder te permite definir diferentes pasos para la construcción de un objeto, haciendo que el proceso sea más flexible y legible, especialmente cuando el objeto tiene muchas partes o configuraciones opcionales.

Imagina que quieres construir una hamburguesa personalizada. En lugar de tener un constructor con diez parámetros para el pan, la carne, el queso, las salsas, etc., puedes usar un Builder. El Builder tendría métodos para añadir cada ingrediente, y al final, un método para "construir" la hamburguesa. Esto evita los "constructores telescópicos" (múltiples constructores con diferentes números de parámetros) y hace que el código cliente sea más claro y menos propenso a errores al no tener que recordar el orden de los parámetros.

El Builder también es útil cuando quieres crear diferentes representaciones del mismo objeto complejo, utilizando el mismo proceso de construcción.

```rust
&title>Ejemplo de Builder: Construcción de un Perfil de Usuario<title&

// El producto complejo: un Perfil de Usuario
#[derive(Debug)]
struct PerfilUsuario {
    nombre: String,
    email: String,
    edad: Option<u8>,
    ocupacion: Option<String>,
    hobbies: Vec<String>,
}

// El Builder para PerfilUsuario
struct PerfilUsuarioBuilder {
    nombre: String,
    email: String,
    edad: Option<u8>,
    ocupacion: Option<String>,
    hobbies: Vec<String>,
}

impl PerfilUsuarioBuilder {
    // Método de inicio para el builder (requiere nombre y email)
    fn new(nombre: String, email: String) -> Self {
        PerfilUsuarioBuilder {
            nombre,
            email,
            edad: None,
            ocupacion: None,
            hobbies: Vec::new(),
        }
    }

    // Métodos para establecer propiedades opcionales (encadenables)
    fn con_edad(mut self, edad: u8) -> Self {
        self.edad = Some(edad);
        self
    }

    fn con_ocupacion(mut self, ocupacion: String) -> Self {
        self.ocupacion = Some(ocupacion);
        self
    }

    fn con_hobby(mut self, hobby: String) -> Self {
        self.hobbies.push(hobby);
        self
    }

    // Método final para construir el PerfilUsuario
    fn construir(self) -> PerfilUsuario {
        PerfilUsuario {
            nombre: self.nombre,
            email: self.email,
            edad: self.edad,
            ocupacion: self.ocupacion,
            hobbies: self.hobbies,
        }
    }
}

fn main() {
    // Construyendo un perfil de usuario simple
    let perfil_simple = PerfilUsuarioBuilder::new(
        "Alice".to_string(),
        "alice@example.com".to_string(),
    )
    .construir();

    println!("Perfil Simple: {:?}", perfil_simple);

    // Construyendo un perfil de usuario completo con opciones
    let perfil_completo = PerfilUsuarioBuilder::new(
        "Bob".to_string(),
        "bob@example.com".to_string(),
    )
    .con_edad(30)
    .con_ocupacion("Ingeniero de Software".to_string())
    .con_hobby("Leer".to_string())
    .con_hobby("Senderismo".to_string())
    .construir();

    println!("Perfil Completo: {:?}", perfil_completo);

    // Otro perfil con diferentes opciones
    let perfil_otro = PerfilUsuarioBuilder::new(
        "Charlie".to_string(),
        "charlie@example.com".to_string(),
    )
    .con_ocupacion("Artista".to_string())
    .construir();

    println!("Perfil Otro: {:?}", perfil_otro);
}
```

language&>es-ES<&