import { ReactNode, useRef, cloneElement, useState, useEffect, CSSProperties } from 'react'
//import { TableIcon, CodeIcon, LinkIcon, ImageIcon, SaveIcon } from '../assets/svgs'
import { NotViewIcon, ViewIcon, SaveIcon } from '../assets/svgs'
import {toCamelCase} from "../hooks/to_camel_case.ts"
import MarkdownRenderer from "../components/markdown_renderer"
import { useDialog } from '../hooks/use_dialog';
import Notify from '../components/notify';

type TextEditorProps = {
  fileName: string,
  onSave: (textValue: string) => void,
  className: string,
  style: CSSProperties,
  defaultValue: string
}

export default function TextEditor({ onSave, fileName, className, style, defaultValue }: TextEditorProps) {
  const [view, setView] = useState(true);
  const [textValue, setTextValue] = useState(defaultValue || '');
  const { dialogRef, open, close } = useDialog();

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

  return (
    <div className="relative p-2 pt-14  w-full h-full" >
      <Notify ref={dialogRef} okey={handlerSave} cancel={close}>
        <span className="text-2xl mb-3">Verificacion para guardar!</span>
      </Notify>

      <div className="fixed z-[49] left-0 top-14 flex justify-center bg-theme-0 items-center px-2 w-full h-14" >
        <div className="relative flex flex-wrap w-full gap-4 items-center justify-center px-4 h-10 bg-theme-d-4-d" >
          <h1 className="text-xl text-center text-theme-0" >{toCamelCase(fileName)}</h1>
          <div className="absolute right-1 w-20 flex flex-row gap-2 items-center" >
            <ViewMarkdown onClick={(value: boolean) => setView(value)} />

            <Option>
              <SaveIcon onClick={handlerSave} />
            </Option>

          </div>
        </div>
      </div>
      {view ?
        <div>
          <textarea
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