import Mark from '../assets/svgs/mark';
import { ReactNode, useState, useEffect, RefObject, CSSProperties, useRef, ChangeEvent } from 'react'
//import { TableIcon, CodeIcon, LinkIcon, ImageIcon, SaveIcon } from '../assets/svgs'
import { NotViewIcon, ViewIcon, SaveIcon, MarkIcon, CodeIcon } from '../assets/svgs'
import { toCamelCase } from "../hooks/to_camel_case.ts"
import MarkdownRenderer from "../components/markdown_renderer"

type TextEditorProps = {
  fileName: string,
  onSave: (textValue: string) => void,
  className: string,
  style: CSSProperties,
  defaultValue: string
}

export default function TextEditor({ onSave, fileName, className, style, defaultValue }: TextEditorProps) {
  const [view, setView] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>()
  const [textValue, setTextValue] = useState(defaultValue || '');

  useEffect(() => {
    setTextValue(defaultValue)
  }, [defaultValue])

  function handlerSave() {
    onSave(textValue)
    close();
  }

  function handlerChangeText(event: ChangeEvent<HTMLTextAreaElement>) {
    setTextValue(event.target.value)
  }

  function Mark() {

    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;

      if (selectionStart === selectionEnd) {
        return;
      }

      const selectedText = textarea.value.substring(selectionStart, selectionEnd);
      const parts = selectedText.split('&content>');

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

  function ContentCode() {

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

  return (
    <div className="relative p-2 pt-28  w-full h-full" >

      <div className="fixed z-[49] left-0 top-14 flex justify-center bg-theme-0 items-center px-2 w-full h-28" >

        <div className="relative flex flex-col w-full items-center justify-center px-4 h-20 bg-theme-d-4-d" >

          <div className="flex w-full items-center justify-center h-10" >
            <h1 className="text-xl text-center text-theme-0" >{toCamelCase(fileName)}</h1>

            <div className="absolute right-1 w-20 flex flex-row gap-2 items-center" >
              <ViewMarkdown onClick={(value: boolean) => setView(value)} />
              <Option>
                <SaveIcon onClick={handlerSave} />
              </Option>
            </div>

          </div>

          <div className="flex flex-row w-full overflow-x-scroll gap-2 items-center" >
            <MarkIcon onClick={Mark} />
            <CodeIcon onClick={ContentCode} />
          </div>

        </div>
      </div>
      {view ?
        <div>
          <textarea
            ref={textareaRef}
            className={className}
            style={style}
            value={textValue}
            onChange={handlerChangeText}
          />
        </div> :
        <MarkdownRenderer>
          {textValue}
        </MarkdownRenderer>
      }
    </div>
  )
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

/*
          <Option>
            <b className="font-extrabold" >B</b>
          </Option>

          <Option>
            <span className="font-bold" >H1</span>
          </Option>

          <Option>
            <span className="font-bold" >H2</span>
          </Option>

          <Option>
            <span className="font-bold" >H3</span>
          </Option>

          <Option>
            <span className="font-bold" onClick={() => {
              console.log(textareaRef.current.value)
            }} >H4</span>
          </Option>

          <Option>
            <em className="italic font-bold">I</em>
          </Option>

          <Option>
            <TableIcon />
          </Option>
          <Option>
            <CodeIcon />
          </Option>

          <Option>
            <ImageIcon />
          </Option>

          <Option>
            <LinkIcon />
          </Option>

*/