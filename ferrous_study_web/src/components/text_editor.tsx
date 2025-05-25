import { getValue, saveValue } from '../hooks/local_storage';
import { ReactNode, useState, useEffect, KeyboardEvent, CSSProperties, useRef, ChangeEvent } from 'react'
//import { ImageIcon } from '../assets/svgs'
import { NotViewIcon, TableIcon, LinkIcon, DivideIcon, EnterIcon, ViewIcon, AskIcon, SaveIcon, MarkIcon, CodeIcon, CloudIcon } from '../assets/svgs'
import { toCamelCase } from '../hooks/to_camel_case.ts'
import ButtonIcon from '../components/button_icon'
import MarkdownRenderer from '../components/markdown_renderer'

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

  function handlerSave() {
    onSave(textValue)
    close();
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

            </div>

          </div>
        </div>
      }
      <div>
        {view ?
          <textarea
            ref={textareaRef}
            className="h-[100dvh] w-full resize-none overflow-hidden p-2 font-sans text-base leading-relaxed border border-theme-4 focus:outline-none focus:border-theme-3"
            value={textValue}
            onChange={handlerChangeText}
          /> :
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
