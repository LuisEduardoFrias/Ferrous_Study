import { useState } from 'react'
import { CloudIcon, ViewIcon, NotViewIcon } from '../../assets/svgs'
import { toCamelCase } from '../../hooks/to_camel_case.ts'
//import ButtonIcon from '../button_icon'
import Option from './option'

type TextEditorHeaderProps = {
   file_name: string;
   on_view_change: (value: boolean) => void;
   on_publish: () => void;
};

export default function TextEditorHeader({ file_name, on_view_change, on_publish }: TextEditorHeaderProps) {
   const [view, set_view] = useState(true);

   function handler_change_view() {
      set_view(!view);
      on_view_change(!view);
   }

   return (
      <div className="flex w-full h-full items-center justify-center">
         <h1 className="text-xl text-center text-theme-0">{toCamelCase(file_name)}</h1>
         <div className="absolute right-1 w-20 flex flex-row gap-2 items-center">
            <Option>
               {view ? (
                  <ViewIcon onClick={handler_change_view} />
               ) : (
                  <NotViewIcon onClick={handler_change_view} />
               )}
            </Option>
            <Option>
               <CloudIcon onClick={on_publish} />
            </Option>
         </div>
      </div>
   );
}
