/*
import { useMemo, ReactNode, useState, useEffect, KeyboardEvent, CSSProperties, useRef, ChangeEvent } from 'react';
import { NotViewIcon, TableIcon, LinkIcon, DivideIcon, EnterIcon, ListIcon, ViewIcon, AskIcon, SaveIcon, MarkIcon, CodeIcon, CloudIcon } from '../../assets/svgs'
import { getValue, saveValue } from '../../hooks/local_storage';
import { toCamelCase } from '../../hooks/to_camel_case.ts'
import ButtonIcon from '../button_icon'
import MarkdownRenderer from '../markdown_renderer'

type TextEditorProps = {
   fileName: string,
   onSave: (textValue: string) => void,
   className: string,
   style: CSSProperties,
   defaultValue: string
}

export default function TextEditor({ onSave, fileName, className, style, defaultValue }: TextEditorProps) {
   const [view, setView] = useState(true);
   const [showTablePanel, setShowTablePanel] = useState(false);
   const [showAskPanel, setShowAskPanel] = useState(false);
   const textareaRef = useRef<HTMLTextAreaElement | null>(null)
   const [textValue, setTextValue] = useState(defaultValue || '');

   useEffect(() => {
      setTextValue(getValue('textEditClass') ?? defaultValue);
   }, [defaultValue])

   useEffect(() => {
      if (textareaRef.current) {
         const textarea = textareaRef.current;
         textarea.style.height = 'auto'; // Reset height
         textarea.style.height = textarea.scrollHeight + 'px'; // Set height to fit content
      }
   }, [textValue]);

   function handlerSave() {
      onSave(textValue)
      // close(); // Asegúrate de que 'close' esté definido si lo usas
   }

   function handlerChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
      setTextValue(event.target.value)
   }

   function Mark() {
      setShowTablePanel(false);
      setShowAskPanel(false);

      if (textareaRef.current) {
         const textarea = textareaRef.current;
         const selectionStart = textarea.selectionStart;
         const selectionEnd = textarea.selectionEnd;

         if (selectionStart === selectionEnd) {
            return;
         }

         const selectedText = textarea.value.substring(selectionStart, selectionEnd);
         const parts = selectedText.split('&>');

         if (parts.length === 2) {
            const newText = `<mark>&title>${parts[0]}<title&${parts[1]}</mark>`;
            const newValue =
               textarea.value.substring(0, selectionStart) +
               newText +
               textarea.value.substring(selectionEnd);

            setTextValue(newValue);
         }
      }
   }

   function Link() {
      setShowTablePanel(false);
      setShowAskPanel(false);

      if (textareaRef.current) {
         const textarea = textareaRef.current;
         const selectionStart = textarea.selectionStart;
         const selectionEnd = textarea.selectionEnd;

         if (selectionStart === selectionEnd) {
            return;
         }

         const selectedText = textarea.value.substring(selectionStart, selectionEnd);
         const parts = selectedText.split('&>');

         if (parts.length === 2) {
            const newText = `[${parts[0]}](${parts[1]})`;
            const newValue =
               textarea.value.substring(0, selectionStart) +
               newText +
               textarea.value.substring(selectionEnd);

            setTextValue(newValue);
         }
      }
   }

   function Table(rows: number, cols: number) {
      setShowTablePanel(false);

      if (textareaRef.current) {
         const textarea = textareaRef.current;
         const selectionStart = textarea.selectionStart;
         const selectionEnd = textarea.selectionEnd;

         const colSeparator = "------|";
         const rowSeparator = "      |";
         const newLine = "\n";

         let separatorLine = "|";
         for (let i = 0; i < cols; i++) {
            separatorLine += rowSeparator;
         }

         let headerRow = "|";
         for (let i = 0; i < cols; i++) {
            headerRow += colSeparator;
         }

         let body = "";
         for (let i = 0; i < rows; i++) {
            let row = "|";
            for (let j = 0; j < cols; j++) {
               row += rowSeparator;
            }
            body += row + newLine;
         }

         const newText = separatorLine + newLine + headerRow + newLine + body;

         const newValue =
            textarea.value.substring(0, selectionStart) +
            newText +
            textarea.value.substring(selectionEnd);

         setTextValue(newValue);
      }
   }

   function Divide() {
      setShowTablePanel(false);
      setShowAskPanel(false);

      if (textareaRef.current) {
         const textarea = textareaRef.current;
         const selectionStart = textarea.selectionStart;
         const selectionEnd = textarea.selectionEnd;

         const newText = "<hr />\n"

         const newValue =
            textarea.value.substring(0, selectionStart) +
            newText +
            textarea.value.substring(selectionEnd);

         setTextValue(newValue);
      }
   }

   function Enter() {
      setShowTablePanel(false);
      setShowAskPanel(false);

      if (textareaRef.current) {
         const textarea = textareaRef.current;
         const selectionStart = textarea.selectionStart;
         const selectionEnd = textarea.selectionEnd;

         const newText = "<br />\n"

         const newValue =
            textarea.value.substring(0, selectionStart) +
            newText +
            textarea.value.substring(selectionEnd);

         setTextValue(newValue);
      }
   }

   function List() {
      setShowTablePanel(false);
      setShowAskPanel(false);

      if (textareaRef.current) {
         const textarea = textareaRef.current;
         const selectionStart = textarea.selectionStart;
         const selectionEnd = textarea.selectionEnd;

         const newText = "- title&>\n- "

         const newValue =
            textarea.value.substring(0, selectionStart) +
            newText +
            textarea.value.substring(selectionEnd);

         setTextValue(newValue);
      }
   }

   function ContentCode() {
      setShowTablePanel(false);
      setShowAskPanel(false);

      if (textareaRef.current) {
         const textarea = textareaRef.current;
         const selectionStart = textarea.selectionStart;
         const selectionEnd = textarea.selectionEnd;

         if (selectionStart === selectionEnd) {
            return;
         }

         const selectedText = textarea.value.substring(selectionStart, selectionEnd);


         const newText = `\`\`\`rust\n&title><title&\n${selectedText}\n\`\`\``;
         const newValue =
            textarea.value.substring(0, selectionStart) +
            newText +
            textarea.value.substring(selectionEnd);

         setTextValue(newValue);
      }
   }

   function SaveCode() {
      setShowTablePanel(false);
      setShowAskPanel(false);
      saveValue('textEditClass', textValue)
   }

   const Tools = () => (
      <div className="relative w-full h-full grid grid-cols-[1fr,30px] " >
         <div className="flex flex-row px-2 w-full h-full overflow-x-scroll gap-2 items-center" >
            <ButtonIcon>
               <MarkIcon onClick={Mark} />
            </ButtonIcon>
            <ButtonIcon>
               <CodeIcon onClick={ContentCode} />
            </ButtonIcon>
            <ButtonIcon>
               <TableIcon onClick={() => { setShowAskPanel(false); setShowTablePanel(!showTablePanel) }} />
            </ButtonIcon>
            <ButtonIcon>
               <LinkIcon onClick={Link} />
            </ButtonIcon>
            <ButtonIcon>
               <DivideIcon onClick={Divide} />
            </ButtonIcon>
            <ButtonIcon>
               <EnterIcon onClick={Enter} />
            </ButtonIcon>
            <ButtonIcon>
               <ListIcon onClick={List} />
            </ButtonIcon>
            <ButtonIcon>
               <SaveIcon onClick={SaveCode} />
            </ButtonIcon>
         </div>
         <div className="flex w-full h-full justify-center items-center" >
            <ButtonIcon>
               <AskIcon onClick={() => { setShowTablePanel(false); setShowAskPanel(!showAskPanel) }} />
            </ButtonIcon>
         </div>
         {showTablePanel && <TablePanel onClick={Table} />}
         {showAskPanel && <AskPanel />}

      </div>);

   return (
      <div className="relative p-2 pt-28  w-full h-full" >
         {
            <div className="fixed z-[39] left-0 top-14 flex justify-center bg-theme-0 items-center px-2 w-full h-28" >

               <div className="relative grid grid-rows-2 gap-0 w-full items-center  px-2 h-20 bg-gray-700" >

                  <div className="flex w-full h-full items-center justify-center" >
                     <h1 className="text-xl text-center text-theme-0" >{toCamelCase(fileName)}</h1>

                     <div className="absolute right-1 w-20 flex flex-row gap-2 items-center" >
                        <ViewMarkdown onClick={(value: boolean) => setView(value)} />
                        <Option>
                           <CloudIcon onClick={handlerSave} />
                        </Option>
                     </div>

                  </div>

                  <Tools />

               </div>
            </div>
         }
         <div className="flex flex-col h-[calc(100vh-theme(spacing.40))]">
            {view ?
               <textarea
                  ref={textareaRef}
                  // Eliminado 'h-screen' y `overflow-hidden` aquí. `flex-grow` y el JS son suficientes
                  className="flex-grow resize-none w-full p-4 font-sans text-base leading-relaxed border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={textValue}
                  onChange={handlerChangeText}
                  placeholder="Escribe algo aquí..."
               />
               :
               <MarkdownRenderer>
                  {textValue}
               </MarkdownRenderer>
            }
         </div>
      </div>
   )
}

interface TablePanelProps {
   onClick: (rows: number, cols: number) => void;
}

function TablePanel({ onClick }: TablePanelProps) {
   const [rows, setRows] = useState<number | undefined>(undefined);
   const [cols, setCols] = useState<number | undefined>(undefined);
   const colInputRef = useRef<HTMLInputElement>(null);

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const numericValue = parseInt(value, 10);

      if (!isNaN(numericValue) && numericValue >= 0) {
         if (name === 'row') {
            setRows(numericValue);
         } else if (name === 'col') {
            setCols(numericValue);
         }
      } else if (value === '') {
         if (name === 'row') {
            setRows(undefined);
         } else if (name === 'col') {
            setCols(undefined);
         }
      }
   };

   const handleClick = () => {
      if (rows !== undefined && cols !== undefined) {
         onClick(rows, cols);
      } else {
         alert('Por favor, ingresa un número válido de filas y columnas.');
      }
   };

   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && colInputRef.current === document.activeElement && rows !== undefined && cols !== undefined) {
         onClick(rows, cols);
      }
   };

   return (
      <div className="absolute top-12 left-5 bg-gray-600 p-5 rounded-md shadow-md z-10 flex gap-2 items-center">
         <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            name="row"
            placeholder="Filas"
            autoFocus
            type="number"
            value={rows !== undefined ? rows : ''}
            onChange={handleChange}
         />
         <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            name="col"
            placeholder="Columnas"
            type="number"
            value={cols !== undefined ? cols : ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={colInputRef}
         />
         <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 cursor-pointer"
            onClick={handleClick}
            disabled={rows === undefined || cols === undefined}
         >
            Agregar
         </button>
      </div>
   );
};

function AskPanel() {
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
               título en la opción de título &title&gt;&lt;title&.
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
               <CloudIcon />Este botón publica todo el texto.
            </p>
            <p>
               <ViewIcon />Esta opción te enseña el lienzo en modo Markdown.
            </p>
         </div>
      </div>
   );
}

function Option({ children }: { children: ReactNode }): JSX.Element {
   return (
      <button className="text-theme-0 bg-transparent border-none p-0 focus:outline-none transition-transform duration-150 active:scale-95 hover:scale-105 w-8 h-8 flex justify-center items-center " >
         {children}
      </button>
   );
}

function ViewMarkdown({ onClick }: { onClick: (value: boolean) => void }) {
   const [view, setView] = useState(true);

   function handlerChangeView() {
      setView(!view);
      onClick(!view);
   }

   return (
      <div>
         {view ?
            <Option>
               <ViewIcon onClick={handlerChangeView} />
            </Option> :
            <Option>
               <NotViewIcon onClick={handlerChangeView} />
            </Option>
         }
      </div>)
}
*/

import { useState, useEffect, CSSProperties, useRef, ChangeEvent } from 'react';
import { getValue, saveValue, removeValue } from '../../hooks/local_storage';
//import { toCamelCase } from '../../hooks/to_camel_case.ts';
import MarkdownRenderer from '../markdown_renderer';
import TextEditorToolbar from './text_editor_toolbar'; // Nuevo componente
import TextEditorHeader from './text_editor_header';   // Nuevo componente

type TextEditorProps = {
   file_name: string;
   on_save: (text_value: string) => void;
   class_name?: string;
   style?: CSSProperties;
   default_value?: string;
};

export default function TextEditor({ on_save, file_name, class_name, style, default_value = '' }: TextEditorProps) {
   const [view, set_view] = useState(true);
   const [show_table_panel, set_show_table_panel] = useState(false);
   const [show_ask_panel, set_show_ask_panel] = useState(false);
   const textarea_ref = useRef<HTMLTextAreaElement | null>(null);
   const [text_value, set_text_value] = useState(default_value);

   useEffect(() => {
      set_text_value(getValue('textEditClass') ?? default_value);
   }, [default_value]);

   useEffect(() => {
      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         textarea.style.height = 'auto';
         textarea.style.height = textarea.scrollHeight + 'px';
      }
   }, [text_value]);

   function handler_change_text(event: ChangeEvent<HTMLTextAreaElement>) {
      set_text_value(event.target.value);
   }

   const insert_text_at_cursor = (new_text: string) => {
      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         const new_value =
            textarea.value.substring(0, selection_start) +
            new_text +
            textarea.value.substring(selection_end);

         set_text_value(new_value);
      }
   };

   const wrap_selected_text = (prefix: string, suffix: string, placeholder: string = '') => {
      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         const selected_text = textarea.value.substring(selection_start, selection_end);
         const text_to_insert = selected_text ? selected_text : placeholder;

         const new_text = `${prefix}${text_to_insert}${suffix}`;
         const new_value =
            textarea.value.substring(0, selection_start) +
            new_text +
            textarea.value.substring(selection_end);

         set_text_value(new_value);

         // Reposicionar el cursor si se insertó un placeholder
         if (!selected_text && textarea_ref.current) {
            textarea_ref.current.selectionStart = selection_start + prefix.length;
            textarea_ref.current.selectionEnd = selection_start + prefix.length + placeholder.length;
         }
      }
   };

   const handle_mark = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);

      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         if (selection_start === selection_end) {
            return;
         }

         const selected_text = textarea.value.substring(selection_start, selection_end);
         const parts = selected_text.split('&>');

         if (parts.length === 2) {
            const new_text = `<mark>&title>${parts[0]}<title&${parts[1]}</mark>`;
            const new_value =
               textarea.value.substring(0, selection_start) +
               new_text +
               textarea.value.substring(selection_end);

            set_text_value(new_value);
         }
      }
   };

   const handle_link = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);

      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         if (selection_start === selection_end) {
            return;
         }

         const selected_text = textarea.value.substring(selection_start, selection_end);
         const parts = selected_text.split('&>');

         if (parts.length === 2) {
            const new_text = `[${parts[0]}](${parts[1]})`;
            const new_value =
               textarea.value.substring(0, selection_start) +
               new_text +
               textarea.value.substring(selection_end);

            set_text_value(new_value);
         }
      }
   };

   const handle_table = (rows: number, cols: number) => {
      set_show_table_panel(false);

      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         const col_separator = "------|";
         const row_separator = "      |";
         const new_line = "\n";

         let separator_line = "|";
         for (let i = 0; i < cols; i++) {
            separator_line += row_separator;
         }

         let header_row = "|";
         for (let i = 0; i < cols; i++) {
            header_row += col_separator;
         }

         let body = "";
         for (let i = 0; i < rows; i++) {
            let row = "|";
            for (let j = 0; j < cols; j++) {
               row += row_separator;
            }
            body += row + new_line;
         }

         const new_text = separator_line + new_line + header_row + new_line + body;

         const new_value =
            textarea.value.substring(0, selection_start) +
            new_text +
            textarea.value.substring(selection_end);

         set_text_value(new_value);
      }
   };

   const handle_divide = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      insert_text_at_cursor("<hr />\n");
   };

   const handle_enter = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      insert_text_at_cursor("<br />\n");
   };

   const handle_list = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      insert_text_at_cursor("- title&>\n- ");
   };

   const handle_content_code = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      wrap_selected_text('```rust\n&title><title&\n', '\n```', 'tu_código_aqui');
   };

   const handle_save_code = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      saveValue(file_name, text_value);
   };

   const handle_publish = () => {
     removeValue(file_name)
      on_save(text_value);
   };

   return (
      <div className={`${class_name} relative p-2 pt-28 w-full h-full`} style={style}>
         <div className="fixed z-[39] left-0 top-14 flex justify-center bg-theme-0 items-center px-2 w-full h-28">
            <div className="relative grid grid-rows-2 gap-0 w-full items-center px-2 h-20 bg-gray-700">
               <TextEditorHeader
                  file_name={file_name}
                  on_view_change={set_view}
                  on_publish={handle_publish}
               />
               <TextEditorToolbar
                  on_mark={handle_mark}
                  on_code={handle_content_code}
                  on_table={() => { set_show_ask_panel(false); set_show_table_panel(!show_table_panel); }}
                  on_link={handle_link}
                  on_divide={handle_divide}
                  on_enter={handle_enter}
                  on_list={handle_list}
                  on_save_local={handle_save_code}
                  on_ask={() => { set_show_table_panel(false); set_show_ask_panel(!show_ask_panel); }}
                  show_table_panel={show_table_panel}
                  show_ask_panel={show_ask_panel}
                  on_insert_table={handle_table}
               />
            </div>
         </div>

         <div className="flex flex-col h-[calc(100vh-theme(spacing.40))]">
            {view ? (
               <textarea
                  ref={textarea_ref}
                  className="flex-grow resize-none w-full p-4 font-sans text-base leading-relaxed border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={text_value}
                  onChange={handler_change_text}
                  placeholder="Escribe algo aquí..."
               />
            ) : (
               <MarkdownRenderer>{text_value}</MarkdownRenderer>
            )}
         </div>
      </div>
   );
}
