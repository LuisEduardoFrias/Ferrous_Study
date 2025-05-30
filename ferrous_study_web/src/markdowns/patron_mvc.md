---
key: 77
name: Patron MVC
addData: 28/05/2025
updateData: null
keywords: 
 - mvc
 - mvp
 - mvvm
 - 
languages:
 - key: Español
   value: es-ES
---
language&>es-ES<&
# El Patrón Modelo-Vista-Controlador (MVC)

---

El patrón **MVC** es un **patrón de diseño arquitectónico** cuyo objetivo principal es organizar el código en tres partes interconectadas, facilitando el desarrollo, la prueba y el mantenimiento de las aplicaciones.

## Componentes del MVC

---

### Modelo (Model)

* Representa la **lógica de negocio** y los **datos** de la aplicación.
* Gestiona el estado de la aplicación, las reglas de negocio y la interacción con la base de datos (si es necesario).
* Es **independiente** de la interfaz de usuario y de cómo se presentan los datos.
* **Ejemplo:** Una clase `Usuario` con atributos como `nombre`, `correo electrónico` y métodos para guardar o recuperar información de la base de datos.

### Vista (View)

* Es la **interfaz de usuario** que se muestra al usuario.
* Presenta los datos del modelo al usuario y captura las acciones del usuario.
* **No contiene lógica de negocio**; su única responsabilidad es mostrar la información proporcionada por el modelo y notificar al controlador sobre las interacciones del usuario.
* **Ejemplos:** Archivos HTML, plantillas Thymeleaf, componentes de React o Angular, u otros tipos de interfaz gráfica.

### Controlador (Controller)

* Actúa como un **intermediario** entre el modelo y la vista.
* Recibe las solicitudes del usuario (acciones como hacer clic en un botón, enviar un formulario).
* Procesa la lógica necesaria para responder a esas solicitudes, como actualizar el modelo o seleccionar qué vista mostrar.
* Actualiza el modelo según las acciones del usuario.
* Selecciona la vista adecuada para mostrar los resultados al usuario.
* **Ejemplo:** Un `UsuarioController` que recibe la solicitud de crear un nuevo usuario, interactúa con el modelo `Usuario` para guardar la información y luego redirige a una vista de confirmación.

---

## Flujo de Interacción en MVC

---

1.  El usuario realiza una acción en la **Vista** (por ejemplo, hace clic en un botón).
2.  La **Vista** notifica al **Controlador** sobre esta acción.
3.  El **Controlador** recibe la solicitud y procesa la lógica necesaria, interactuando con el **Modelo** para actualizar los datos si es necesario.
4.  El **Modelo** actualiza su estado.
5.  El **Controlador** selecciona una **Vista** para mostrar los resultados al usuario.
6.  La **Vista** toma los datos del **Modelo** y los presenta al usuario.

---

## ¿Qué tipo de patrón es?

---

El patrón **MVC** es un **patrón de diseño arquitectónico**. Se centra en la estructura general de una aplicación y cómo se organizan sus diferentes componentes para manejar la presentación de la información y la interacción del usuario.

---

## Tecnologías donde se suele usar MVC

---

### Desarrollo Web

* **Ruby on Rails:** Un framework popular que sigue estrictamente el patrón MVC.
* **Django (Python):** Aunque a veces se le considera un patrón MVW (Model-View-Whatever), su estructura se basa en los principios del MVC.
* **ASP.NET MVC (.NET):** Implementa claramente el patrón MVC para el desarrollo web.
* **Spring MVC (Java):** Un framework robusto para construir aplicaciones web basadas en Java con una arquitectura MVC.

---

## Variantes del Patrón MVC

---

Con el tiempo, han surgido varias adaptaciones del patrón MVC para abordar diferentes necesidades y desafíos en el desarrollo de aplicaciones.

### 1. Modelo-Vista-Presentador (MVP)

* **Tipo de Patrón:** Patrón de diseño de presentación.
* **Componentes:**
    * **Modelo (Model):** Similar al MVC, contiene la lógica de negocio y los datos.
    * **Vista (View):** Interfaz de usuario pasiva. La vista en MVP suele tener una referencia al Presentador.
    * **Presentador (Presenter):** Intermediario activo entre el Modelo y la Vista. Recibe acciones del usuario de la Vista, actualiza el Modelo y luego formatea los datos del Modelo para que la Vista los muestre. La Vista delega la lógica de presentación al Presentador.
* **Flujo de Interacción:** La Vista delega las acciones del usuario al Presentador. El Presentador interactúa con el Modelo y luego actualiza la Vista. Puede haber una relación uno a uno entre la Vista y el Presentador.
* **Ventajas:** Mayor capacidad de prueba de la lógica de presentación (reside en el Presentador). Mayor separación de responsabilidades entre la Vista y la lógica de presentación.
* **Tecnologías donde se suele usar MVP:**
    * WinForms (.NET)
    * WPF (.NET)
    * Android (en algunas arquitecturas)

### 2. Modelo-Vista-ViewModel (MVVM)

* **Tipo de Patrón:** Patrón de diseño de presentación, evolucionado a partir del MVP.
* **Componentes:**
    * **Modelo (Model):** Similar al MVC y MVP, contiene la lógica de negocio y los datos.
    * **Vista (View):** La interfaz de usuario. En MVVM, la Vista suele estar enlazada a datos (data binding) con el ViewModel. Los cambios en el ViewModel se reflejan automáticamente en la Vista, y viceversa. Contiene la menor cantidad de lógica posible.
    * **ViewModel:** Actúa como una abstracción de la Vista. Expone datos (en forma de propiedades) y comandos (para las acciones del usuario) que la Vista puede consumir. Contiene la lógica de presentación y prepara los datos del Modelo para ser mostrados en la Vista. No tiene una referencia directa a la Vista. La comunicación se realiza a través del data binding.
* **Flujo de Interacción:** La Vista se enlaza a las propiedades y comandos del ViewModel. Las acciones del usuario en la Vista se enlazan a los comandos del ViewModel. El ViewModel actualiza el Modelo y expone los datos actualizados, que se reflejan automáticamente en la Vista gracias al data binding.
* **Ventajas:** Excelente separación de responsabilidades, facilita las pruebas unitarias del ViewModel, mejora la capacidad de desarrollo en paralelo entre diseñadores y desarrolladores.
* **Tecnologías donde se suele usar MVVM:**
    * WPF (.NET)
    * UWP (Universal Windows Platform)
    * Xamarin.Forms (.NET MAUI)
    * Angular (con su concepto de componentes y data binding)
    * Vue.js (con su sistema de reactividad)

### Otros Patrones Relacionados

* **Jerarquía Modelo-Vista-Controlador (HMVC):** Extiende el MVC para aplicaciones más complejas con múltiples vistas y modelos interconectados, permitiendo una organización jerárquica de vistas y controladores para modularidad y reutilización.
* **Patrón de Contenedor/Presentador (PAC - Presentation-Abstraction-Control):** Divide la interfaz de usuario en una jerarquía de Presentación (apariencia), Abstracción (datos y lógica de negocio) y Control (intermediario y flujo de control).
* **Arquitectura Componente-Entidad-Sistema (ECS - Entity-Component-System):** Más común en videojuegos, se centra en la composición sobre la herencia, con Entidades (identificadores), Componentes (datos) y Sistemas (lógica que opera sobre componentes).
* **Arquitectura Flux y Redux:** Patrones de gestión de estado populares en React, centrados en un flujo de datos unidireccional (Store, Actions, Reducers, Views) para una gestión predecible del estado.
* **Arquitectura Model-View-Intent (MVI):** Popular en el desarrollo reactivo, con un ciclo de datos unidireccional explícito donde la Vista envía "Intents" (intenciones del usuario), el Modelo (Estado) se actualiza, y la Vista se re-renderiza con el nuevo estado.

---

## Enfoque en Rust y el Patrón MVC

---

Aunque Rust no impone un patrón MVC estricto de forma nativa como algunos frameworks de alto nivel, sus principios de **propiedad (ownership)**, **préstamo (borrowing)** y **concurrencia segura** son ideales para construir arquitecturas limpias y modulares. Es común ver implementaciones de MVC o sus variantes en aplicaciones de escritorio con librerías como `gtk-rs` o `iced`, y en menor medida en web pura sin frameworks específicos.

En Rust, podrías estructurar una aplicación MVC de la siguiente manera:

* **Modelo:** Definirías structs que representen tus datos y su lógica de negocio. Estas structs tendrían métodos para manipular los datos y podrían interactuar con una base de datos o servicios externos.
* **Vista:** Podría ser definida por una librería de GUI (Graphical User Interface) que renderiza los datos y captura eventos del usuario.
* **Controlador:** Tomaría los eventos de la vista, interactuaría con el modelo para actualizar el estado y luego indicaría a la vista que se actualice.

Aquí un ejemplo simplificado de cómo podrías concebir las estructuras en Rust, sin una implementación completa de la lógica de GUI:

```rust
// --- Modelo ---
// Define la estructura de los datos y su lógica de negocio.
pub struct Usuario {
    pub id: u32,
    pub nombre: String,
    pub email: String,
}

impl Usuario {
    pub fn new(id: u32, nombre: String, email: String) -> Self {
        Usuario { id, nombre, email }
    }

    // Método de ejemplo para simular guardar en una DB
    pub fn guardar(&self) {
        println!("Guardando usuario: {} ({})", self.nombre, self.email);
        // Aquí iría la lógica real de persistencia (ej. base de datos)
    }

    // Método de ejemplo para simular cargar de una DB
    pub fn cargar(id: u32) -> Option<Self> {
        println!("Cargando usuario con ID: {}", id);
        // Simulación de una carga
        if id == 1 {
            Some(Usuario::new(1, "Juan Perez".to_string(), "juan@example.com".to_string()))
        } else {
            None
        }
    }
}

// --- Vista (Representación conceptual sin lógica de UI real) ---
// La Vista se encarga de mostrar la información al usuario.
// En una aplicación real, esto sería manejado por una librería GUI (ej. Iced, GTK).
pub trait VistaUsuario {
    fn mostrar_usuario(&self, usuario: &Usuario);
    fn obtener_input_usuario(&self) -> String; // Simula la captura de input
    fn mostrar_mensaje(&self, mensaje: &str);
}

// Implementación de ejemplo para consola
pub struct ConsolaVista;

impl VistaUsuario for ConsolaVista {
    fn mostrar_usuario(&self, usuario: &Usuario) {
        println!("--- Información del Usuario ---");
        println!("ID: {}", usuario.id);
        println!("Nombre: {}", usuario.nombre);
        println!("Email: {}", usuario.email);
        println!("----------------------------");
    }

    fn obtener_input_usuario(&self) -> String {
        println!("Por favor, ingrese un ID de usuario:");
        let mut input = String::new();
        std::io::stdin().read_line(&mut input).expect("Fallo al leer la línea");
        input.trim().to_string()
    }

    fn mostrar_mensaje(&self, mensaje: &str) {
        println!("{}", mensaje);
    }
}

// --- Controlador ---
// Actúa como intermediario entre el Modelo y la Vista.
pub struct ControladorUsuario {
    modelo: Usuario,
    vista: ConsolaVista, // Aquí se usaría un 'Box<dyn VistaUsuario>' en un caso más genérico
}

impl ControladorUsuario {
    pub fn new(usuario: Usuario, vista: ConsolaVista) -> Self {
        ControladorUsuario { modelo: usuario, vista }
    }

    pub fn iniciar(&mut self) {
        // Inicialmente, mostramos el usuario actual del modelo
        self.vista.mostrar_usuario(&self.modelo);

        // Simular una acción del usuario: cargar un usuario por ID
        let input_id = self.vista.obtener_input_usuario();
        if let Ok(id) = input_id.parse::<u32>() {
            if let Some(usuario_cargado) = Usuario::cargar(id) {
                self.modelo = usuario_cargado; // Actualiza el modelo
                self.vista.mostrar_usuario(&self.modelo); // Notifica a la vista para actualizar
                self.vista.mostrar_mensaje("Usuario cargado exitosamente.");
            } else {
                self.vista.mostrar_mensaje("Usuario no encontrado.");
            }
        } else {
            self.vista.mostrar_mensaje("ID inválido.");
        }

        // Simular otra acción: actualizar y guardar el usuario actual
        self.modelo.nombre = "Nuevo Nombre".to_string();
        self.modelo.email = "nuevo@example.com".to_string();
        self.modelo.guardar(); // El controlador le dice al modelo que se guarde
        self.vista.mostrar_usuario(&self.modelo); // La vista se actualiza con el modelo modificado
        self.vista.mostrar_mensaje("Usuario actualizado y guardado.");
    }
}

// Función principal para ejecutar el ejemplo
fn main() {
    let usuario_inicial = Usuario::new(0, "Usuario de Prueba".to_string(), "test@example.com".to_string());
    let vista = ConsolaVista; // Instancia de la vista
    let mut controlador = ControladorUsuario::new(usuario_inicial, vista);

    controlador.iniciar();
}
```

## Estructura de Archivos para Rust con MVC

Aquí te presento una estructura de carpetas y archivos típica para una aplicación Rust siguiendo el patrón MVC, junto con una breve explicación de cada parte:

```
/nombre_de_tu_proyecto_rust/
├── src/
│   ├── main.rs
│   ├── models/
│   │   ├── mod.rs
│   │   └── user.rs
│   ├── views/
│   │   ├── mod.rs
│   │   └── user_view.rs
│   ├── controllers/
│   │   ├── mod.rs
│   │   └── user_controller.rs
│   └── routes/
│       ├── mod.rs
│       └── web.rs
├── Cargo.toml
├── Cargo.lock
└── .env (opcional, para variables de entorno)
```

---

### Explicación de la Estructura

* **\`/nombre_de_tu_proyecto_rust/\`**:
    Esta es la **carpeta raíz de tu proyecto Rust**. Cuando creas un nuevo proyecto con \`cargo new nombre_de_tu_proyecto_rust\`, Cargo la genera automáticamente.

* **\`src/\`**:
    Esta es la carpeta principal donde reside **todo tu código fuente de Rust**. Cargo espera encontrar tu código aquí.

    * **\`main.rs\`**:
        Este es el **punto de entrada principal** de tu aplicación Rust. Aquí es donde se inicia tu servidor web (si es una aplicación web), se configura el enrutamiento y se orquestan las diferentes partes (modelos, vistas, controladores).

    * **\`models/\`**:
        Esta carpeta contiene los **modelos de tu aplicación**. Los modelos representan la lógica de negocio y la interacción con la base de datos o cualquier fuente de datos.
        * **\`mod.rs\`**: Este archivo actúa como el "módulo" de la carpeta \`models/\`. Exporta los módulos definidos en los otros archivos de la carpeta, como \`user.rs\`, haciendo que estén disponibles para otras partes de tu código (por ejemplo, en \`main.rs\` o en tus controladores).
        * **\`user.rs\`**: Un ejemplo de un archivo de modelo. Aquí definirías la estructura de datos para un usuario (por ejemplo, \`struct User { id: u32, name: String }\`) y las funciones para interactuar con la base de datos (guardar, obtener, actualizar, eliminar usuarios). Podrías tener otros archivos como \`product.rs\`, \`order.rs\`, etc., dependiendo de las entidades de tu aplicación.

    * **\`views/\`**:
        Aunque Rust no tiene "vistas" en el sentido tradicional de plantillas HTML directamente ejecutables como en otros frameworks, esta carpeta representaría la **lógica para presentar los datos al usuario**. Si estás construyendo una API REST, aquí podrías tener funciones que serializan datos (por ejemplo, structs de Rust) a JSON o XML. Si es una aplicación web que sirve HTML, aquí estarían las plantillas (usando crates como Askama, Tera, etc.) y la lógica para renderizarlas.
        * **\`mod.rs\`**: Módulo que exporta las vistas definidas en esta carpeta.
        * **\`user_view.rs\`**: Un ejemplo de un archivo de vista. Podría contener funciones para formatear los datos de un usuario antes de enviarlos como respuesta.

    * **\`controllers/\`**:
        Aquí residen tus **controladores**. Los controladores actúan como el **intermediario** entre el usuario (o la solicitud HTTP) y los modelos. Reciben las solicitudes, procesan los datos de entrada, llaman a la lógica de negocio en los modelos y luego le dicen a la vista cómo presentar la respuesta.
        * **\`mod.rs\`**: Módulo que exporta los controladores de esta carpeta.
        * **\`user_controller.rs\`**: Un ejemplo de un controlador específico para las operaciones relacionadas con usuarios (por ejemplo, \`fn get_user(req: Request) -> Response\`, \`fn create_user(req: Request) -> Response\`).

    * **\`routes/\`**:
        Esta carpeta manejaría la **definición de las rutas** de tu aplicación. Aquí es donde se mapean las URL entrantes a los controladores y sus funciones específicas.
        * **\`mod.rs\`**: Módulo que exporta las rutas definidas en esta carpeta.
        * **\`web.rs\`**: Contendría las definiciones de las rutas de tu aplicación (por ejemplo, \`/users\` se mapea a \`user_controller::get_all_users\`).

* **\`Cargo.toml\`**:
    Este es el **manifiesto del paquete de Cargo**. Define las dependencias de tu proyecto (otras librerías o "crates" que tu proyecto necesita), la versión, los autores, etc. Es esencial para que Cargo sepa cómo construir y manejar tu proyecto.

* **\`Cargo.lock\`**:
    Generado automáticamente por Cargo, este archivo **bloquea las versiones exactas de todas las dependencias** que tu proyecto utiliza. Esto asegura que la construcción de tu proyecto sea reproducible en diferentes entornos.

* **\`.env\` (opcional)**:
    Este archivo se usa comúnmente para almacenar **variables de entorno** (como claves de API, cadenas de conexión a bases de datos, etc.) que no deben ser parte del control de versiones. Las librerías de Rust pueden cargarlas al inicio de tu aplicación.

---

### ¿Cómo se Relacionan en Rust?

En Rust, estas carpetas y archivos se relacionan a través del **sistema de módulos** de Rust (\`mod\`).

1.  **\`main.rs\`** declararía \`mod\`s para \`models\`, \`views\`, \`controllers\`, y \`routes\`. Por ejemplo:
    ```rust
    // src/main.rs
    mod models;
    mod views;
    mod controllers;
    mod routes;

    fn main() {
        // Aquí se inicializa tu servidor web y se configuran las rutas
        // usando funciones de \`routes::web\` que a su vez llaman a funciones de \`controllers::user_controller\`, etc.
    }
    ```

2.  Dentro de cada carpeta como \`models/\`, su \`mod.rs\` declararía \`pub mod\`s para los archivos dentro de esa carpeta. Por ejemplo:
    ```rust
    // src/models/mod.rs
    pub mod user; // Esto hace que \`user.rs\` sea accesible como \`models::user\`
    ```

3.  De esta manera, en tus **controladores**, podrías importar y usar funciones y structs de tus **modelos**:
    ```rust
    // src/controllers/user_controller.rs
    use crate::models::user::{User, get_all_users}; // Accedes a \`User\` y \`get_all_users\` desde el módulo \`user\` dentro de \`models\`

    // ... lógica del controlador
    ```

4.  Y en tus **rutas**, podrías mapear URLs a funciones específicas de tus **controladores**:
    ```rust
    // src/routes/web.rs
    use crate::controllers::user_controller::{get_user_handler, create_user_handler};

    pub fn setup_routes() {
        // Imagina un framework web como Axum o Actix-web
        // route("/users", get(get_user_handler).post(create_user_handler));
    }
    ```

Este enfoque modular te permite organizar tu código de manera lógica, lo que facilita la lectura, el mantenimiento y la escalabilidad de tu aplicación Rust.

language&>es-ES<&
