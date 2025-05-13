import { ReactNode, useRef, cloneElement } from 'react'
import { TableIcon, CodeIcon, LinkIcon, ImageIcon, SaveIcon } from '../assets/svgs'
import { githubService } from '../services/github_service'

type TextEditorProps = {
  children: ReactNode,
  markdownName: string
}

export default function TextEditor({ children, markdownName }: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>();

  return (
    <div className="relative p-2 pt-24  w-full h-full" >

      <div className="fixed left-0 top-14 flex justify-center bg-theme-0 items-center px-2 w-full h-24" >
        <div className="flex flex-wrap w-full px-4 h-20 bg-gray-600" >
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
            <SaveIcon onClick={async () => {
              console.log("consumiendo la api update: ", await githubService.updateFileContent(markdownName, textareaRef.current.value, 'markdown'))
            }} />
          </Option>

          <Option>
            <LinkIcon />
          </Option>

        </div>
      </div>
      <div>
        {cloneElement(children, { ref: textareaRef })}
      </div>
    </div>
  )
}

type OptionProps = {

}

function Option({ children }: OptionProps) {
  return (
    <button className="text-theme-0 bg-transparent border-none p-0 focus:outline-none transition-transform duration-150 active:scale-95 hover:scale-105 w-8 h-8 flex justify-center items-center " >
      {children}
    </button>
  )
}
