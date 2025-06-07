import { useRef, useState, ChangeEvent } from 'react';
import Paragraph from '../components/paragraph';
import { useTitle } from '../hooks/use_title';
import { FerrisIcon } from '../assets/svgs'
import { githubServiceApi } from '../services/github_service'
interface Tool {
   name: string;
   url: string;
   description: string;
}

const tools: Tool[] = [
   {
      name: 'Termux',
      url: 'https://f-droid.org/es/packages/com.termux/',
      description:
         'Emulador de terminal para Android que te permite ejecutar una interfaz de línea de comandos Linux directamente en tu dispositivo, brindando acceso a potentes herramientas y comandos.',
   },
   {
      name: 'Acode',
      url: 'https://acode.foxdebug.com/',
      description:
         'Editor de código potente y ligero para Android. Ofrece resaltado de sintaxis para múltiples lenguajes, autocompletado, búsqueda y reemplazo, y la capacidad de editar archivos locales y remotos.',
   },
   //   {
   //     name: 'Clerk',
   //     url: 'https://clerk.com/',
   //     description: `Clerk es una plataforma que simplifica la autenticación y gestión de usuarios para aplicaciones web y móviles. En lugar de construir estos sistemas desde cero, los desarrolladores pueden integrar Clerk en sus aplicaciones para manejar de forma segura tareas como:
   // 
   //       \n* Registro e inicio de sesión de usuarios.
   //       \n* Gestión de perfiles de usuario.
   //       \n* Gestión de sesiones.
   //       \n* Control de acceso y autorización.
   //       \n* Soporte para organizaciones y equipos.
   // 
   //       \n\nClerk se integra fácilmente con varios frameworks y lenguajes de programación, especialmente aquellos modernos como Next.js, React, Remix y Expo. Ofrece componentes de interfaz de usuario preconstruidos y APIs flexibles para adaptarse a las necesidades de cada aplicación.`,
   //   },
   {
      name: 'React',
      url: 'https://react.dev/',
      description:
         'Biblioteca de JavaScript para construir interfaces de usuario interactivas y dinámicas. Se enfoca en la creación de componentes reutilizables y en la gestión eficiente del estado de la aplicación.',
   },
   {
      name: 'Vite',
      url: 'https://vitejs.dev/',
      description:
         'Herramienta de construcción de última generación para proyectos web modernos. Destaca por su velocidad de inicio instantánea y su recarga de módulos instantánea durante el desarrollo.',
   },
   {
      name: 'Express.js',
      url: 'https://expressjs.com/',
      description:
         'Framework web minimalista y flexible para Node.js, diseñado para construir aplicaciones web y APIs robustas con un conjunto amplio de características para el enrutamiento, middleware y manejo de solicitudes HTTP.',
   },
];

export default function About() {
   useTitle('Acerca de');
   const [showForm, setShowForm] = useState(false);
   const hoverTimer = useRef<number | null>(null);

   const handleMouseEnter = () => {
      hoverTimer.current = setTimeout(() => {
         setShowForm(true);
      }, 10000);
   };

   const handleMouseLeave = () => {
      if (hoverTimer.current) {
         clearTimeout(hoverTimer.current);
         hoverTimer.current = null;
      }
   };

   const yourCreativeCommonsLicenseName =
      'Licencia Creative Commons NoComercial CompartirIgual 4.0';
   const yourCreativeCommonsLicenseLink =
      'https://creativecommons.org/licenses/by-nc-sa/4.0/';
   const apache2LicenseLink = 'https://www.apache.org/licenses/LICENSE-2.0';
   const apache2LicenseName = 'Licencia Apache-2.0';
   const yourCopyright = `${new Date().getFullYear()} Luis Eduardo Frías. Todos los derechos reservados.`;
   const yourLinkedInProfile =
      'https://do.linkedin.com/in/luis-eduardo-frias-64204b1a3';
   const yourGitHubProfile = 'https://github.com/LuisEduardoFrias';

   return (
      <div className="rounded-lg shadow-md p-6 ">
         {showForm && <LoginForm onClose={() => setShowForm(false)} />}
         <div className="mb-8">
            <h2 className="text-2xl font-semibold text-theme-04 mb-4">
               ¿Por qué FerrousStudy?
            </h2>
            <Paragraph className="text-theme-04 mb-2">
               Este nombre tiene una conexión muy especial con 'Ferris', la mascota no
               oficial, pero sumamente querida, de Rust.
            </Paragraph>
            <Paragraph className="text-theme-04 mb-2">
               El nombre de Ferris surgió como un ingenioso juego de palabras a partir
               del adjetivo inglés 'ferrous', que significa 'de hierro o que contiene
               hierro'. Considerando que el óxido ('rust' en inglés) a menudo se forma
               sobre el hierro.
            </Paragraph>
            <Paragraph className="text-theme-04 mb-2">
               'FerrousStudy' es un homenaje directo a Ferris, el cual a su vez
               proviene de 'ferrous'. Me pareció un origen divertido y significativo
               para el nombre de la mascota.
            </Paragraph>
            <Paragraph className="text-theme-04">
               Así, FerrousStudy nace, como un espacio dedicado al aprendizaje de Rust,
               llevando con orgullo el nombre de este símbolo de nuestra comunidad.
               <FerrisIcon />
            </Paragraph>
         </div>

         <h2 className="text-xl font-semibold text-theme-04 mb-4">
            Contenido Basado en Comprehensive Rust de Google
         </h2>
         <Paragraph className="text-theme-04 mb-4">
            El contenido de este curso, incluyendo las lecciones y los ejercicios
            adaptados, se basa en el excelente proyecto de código abierto{' '}
            <a
               href="https://github.com/google/comprehensive-rust"
               target="_blank"
               rel="noopener noreferrer"
            >
               Comprehensive Rust
            </a>{' '}
            de Google, distribuido bajo la{' '}
            <a
               href={apache2LicenseLink}
               target="_blank"
               rel="noopener noreferrer"
            >
               {apache2LicenseName}
            </a>
            . Agradezco enormemente su dedicación a la creación de este recurso
            educativo de alta calidad. Puedes visitar la página web original{' '}
            <a
               href="https://google.github.io/comprehensive-rust/es/print.html"
               target="_blank"
               rel="noopener noreferrer"
            >
               aquí
            </a>
            .
         </Paragraph>
         <div className="mb-4">
            <h3 className="text-lg font-semibold text-theme-04 mb-2">
               Licencia del Contenido Base Adaptado
            </h3>
            <Paragraph className="text-theme-04">
               El contenido base de este curso (las lecciones y ejercicios adaptados
               de Comprehensive Rust) se utiliza bajo los términos de la{' '}
               <a
                  href={apache2LicenseLink}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {apache2LicenseName}
               </a>
               .
            </Paragraph>
         </div>
         <div>
            <h3 className="text-lg font-semibold text-theme-04 mb-2">
               Modificaciones y Adiciones
            </h3>
            <Paragraph className="text-theme-04 mb-4">
               Se han realizado algunas modificaciones en el contenido original para
               mejorar la interpretación, la claridad y la adaptación a este formato
               de curso. Estas modificaciones incluyen ajustes en la redacción,
               adiciones de explicaciones y ligeras alteraciones en algunos ejemplos de
               código.
            </Paragraph>
         </div>
         <div className="mt-6 border-t border-theme-02 pt-6">
            <h2 className="text-xl font-semibold text-theme-04 mb-4">
               Sobre el Autor
            </h2>
            <Paragraph className="text-theme-04 mb-2">
               Este curso fue creado por{' '}
               <a
                  href={yourLinkedInProfile}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Luis Eduardo Frías
               </a>
               .
            </Paragraph>
            <Paragraph className="text-theme-04">
               Puedes encontrar más sobre mi trabajo y proyectos en{' '}
               <a
                  href={yourGitHubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  mi perfil de GitHub
               </a>
               .
            </Paragraph>
         </div>
         <div className="mt-6 border-t border-theme-02 pt-6">
            <h2 className="text-xl font-semibold text-theme-04 mb-4">
               Créditos y Herramientas
            </h2>
            <h3 className="text-lg font-semibold text-theme-04 mb-2">
               Iconos SVG he imagenes
            </h3>
            <div className="list-disc list-inside text-theme-04">
               <Paragraph className="text-theme-04 mb-2">
                  Los iconos SVG utilizados en este sitio web provienen de{' '}
                  <a
                     href="https://www.svgrepo.com/"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     SVG Repo
                  </a>
                  , un excelente recurso de iconos vectoriales gratuitos.
               </Paragraph>
               <Paragraph className="text-theme-04 mb-2">
                  El icono SVG de Ferris en este sitio web proviene de{' '}
                  <a
                     href="https://rustacean.net/"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     Rustacean
                  </a>
                  , un excelente recurso de vectores, imágenes, gifs, y otros, sobre
                  Ferris, gratuitos.
               </Paragraph>
               <Paragraph className="text-theme-04 mb-2">
                  El gif de Ferris en este sitio web proviene de{' '}
                  <a
                     href="https://www.rust-lang.org/es/learn/get-started"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     Rust lang - página oficial de Rust
                  </a>
                  , donde encontrarás toda la información de Rust de forma oficial.
               </Paragraph>
            </div>
            <h3 className="text-lg font-semibold text-theme-04 mb-2">
               Herramientas y Tecnologías de Desarrollo
            </h3>
            <ul className="list-disc list-inside text-theme-04">
               <ToolList />
            </ul>
         </div>
         <div className="mt-6 border-t border-theme-02 pt-6">
            <h2 className="text-xl font-semibold text-theme-04 mb-4">
               Licencia para el Contenido Original
            </h2>
            <Paragraph className="text-theme-04">
               El diseño de esta página web, la estructura del curso y cualquier
               adición o modificación sustancial realizada por el autor (Luis Eduardo
               Frías) se distribuyen bajo la{' '}
               <a
                  href={yourCreativeCommonsLicenseLink}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {yourCreativeCommonsLicenseName}
               </a>
               .
            </Paragraph>
            <Paragraph className="text-sm text-theme-04 mt-2">
               Esto significa que puedes compartir, copiar y redistribuir el material
               no comercialmente, siempre que des el crédito apropiado y distribuyas
               tus contribuciones bajo la misma licencia.
            </Paragraph>
         </div>
         <div className="mt-6 border-t border-theme-02 pt-6">
            <Paragraph className="text-theme-04 flex flex-row gap-1 items-center">
               <button
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="border-none hover:bg-amber-200 h-[12px] w-[12px] flex justify-center items-center bg-transparent text-theme-0 p-0"
               >
                  ©
               </button>{yourCopyright}</Paragraph>
         </div>
      </div>
   );
}


interface ToolItemProps {
   tool: Tool;
}

function ToolItem({ tool }: ToolItemProps) {
   return (
      <li>
         <a href={tool.url} target="_blank" rel="noopener noreferrer">
            {tool.name}
         </a>{' '}
         <Paragraph>{tool.description}</Paragraph>
      </li>
   );
}

function ToolList() {
   return (
      <ul className="list-disc list-inside text-theme-04">
         {tools.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
         ))}
      </ul>
   );
}

function LoginForm({ onClose }: { onClose: () => void }) {
   const [error, setError] = useState('');

   async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();

      const username = e.target.username.value;
      const password = e.target.password.value;

      setError('');

      const auth = await githubServiceApi.login(username, password);

      if (auth) {
         onClose();
      } else {
         setError('Usuario o contraseña incorrectos.');
      }
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm relative text-center transform transition-all duration-300 ease-out scale-100 opacity-100">
            <button
               className="rounded-full flex justify-center items-center  bg-theme-2-d absolute top-2 right-3 text-theme-0 hover:text-theme-04 text-2xl leading-ñ font-light w-10 h-10"
               onClick={onClose}
            >
               &times;
            </button>
            <h2 className="text-3xl font-bold text-theme-04 mb-6">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label htmlFor="username" className="block text-left text-theme-04 text-sm font-semibold mb-2">
                     Usuario:
                  </label>
                  <input
                     type="text"
                     id="username" // El 'id' se usa para referenciar el input por su nombre
                     name="username" // ¡Importante! El 'name' es clave para acceder al valor
                     className="w-full px-4 py-2 border border-theme-04 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>
               <div>
                  <label htmlFor="password" className="block text-left text-theme-04 text-sm font-semibold mb-2">
                     Contraseña:
                  </label>
                  <input
                     type="password"
                     id="password" // El 'id' se usa para referenciar el input por su nombre
                     name="password" // ¡Importante! El 'name' es clave para acceder al valor
                     className="w-full px-4 py-2 border border-theme-04 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     required
                  />
               </div>
               {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out font-semibold text-lg"
               >
                  Entrar
               </button>
            </form>
         </div>
      </div>
   );
}


