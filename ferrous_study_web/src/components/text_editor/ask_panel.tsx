import { MarkIcon, CodeIcon, TableIcon, LinkIcon, DivideIcon, EnterIcon, SaveIcon, CloudIcon, ViewIcon } from '../../assets/svgs';

export default function AskPanel() {
   return (
      <div className="absolute top-12 -right-2 bg-gray-700 overflow-y-scroll h-96 shadow shadow-theme-o-4 border border-gray-300 shadow-lg rounded-md p-6 z-50 w-full max-w-md">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-theme-0">Información de Ayuda</h3>
         </div>
         <div className="space-y-7 text-theme-0">
            <p>
               <MarkIcon /> Es una opción que crea un marcado. Para ello, separa el título de lo que quieres marcar con '&&gt;', Ejemplo: 'título&&gt;marcado', luego selecciona todo y presiona el botón de marcado.
            </p>
            <p>
               <CodeIcon /> Es una opción para presentar código de programación. Escribe tu código, selecciónalo y presiona el botón. Puedes poner un
               título en la opción de título '&title&gt;&lt;title&', tambien puedes desactivar el boton de 'playground' con "&&gt;notplay", tambien
               puedes evitar que se copien partes del texto, colocandolo entre "notcopy&&gt;" "&lt;&notcopy".
            </p>
            <p>
               <TableIcon /> Esta opción te permite crear tablas. Presiona el botón e introduce la cantidad de filas y la cantidad de columnas de tu tabla. Haz clic donde requieres colocar tu tabla en el lienzo y presiona agregar.
            </p>
            <p>
               <LinkIcon /> Es una opción para crear links más cortos. Escribe un título y sepáralo del link con '&&gt;'. Ejemplo: 'título&&gt;link'. Selecciona todo y presiona el botón.
            </p>
            <p>
               <DivideIcon /> Es una opción para crear un divisor. Solo haz clic donde quieres colocar tu división en el lienzo y presiona la opción.
            </p>
            <p>
               <EnterIcon /> Esta opción agrega un salto de línea. Selecciona en qué lugar quieres agregar el salto en tu lienzo y haz clic en la opción.
            </p>
            <p>
               <SaveIcon /> Este botón guarda por un lapso de 1 minuto todo tu texto. Ideal por si cometes el error de actualizar la página. Solo presiona el botón.
            </p>
            <p>
               <CloudIcon /> Este botón publica todo el texto.
            </p>
            <p>
               <ViewIcon /> Esta opción te enseña el lienzo en modo Markdown.
            </p>
         </div>
      </div>
   );
}
