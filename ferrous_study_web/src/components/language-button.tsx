import Li from './li';
import { useState } from "react"
import { useClickOutside } from '../hooks/use_click_on_side'
import { WorldIcon } from '../assets/svgs'
import { useStore } from '../state_warehouse/index'
import type { TLanguages } from '../types/language'

export default function LanguageButton() {
  const [togger, setTogger] = useState(false)
  const languages = useStore((state) => state.languages)
  const languageSelected = useStore((state) => state.languageSelected)
  const on_change_language = useStore((state) => state.on_change_language)
  const ulRef = useClickOutside<HTMLDivElement>(() => setTogger(false))

  function select(lang: TLanguages) {
    return languageSelected.value === lang.value && "bg-theme-4 font-bold border-t border-b border-theme-3";
  }

  return (
    <div ref={ulRef}  >
      <WorldIcon onClick={() => setTogger(!togger)} />
      <ul style={{ backdropFilter: 'blur(10px)' }} className={`absolute top-12 right-10 transition-all shadow shadow-theme-4 w-32 py-2 ${togger ? "h-auto py-2" : "py-0 h-[0px]"} flex flex-col gap-2 bg-translucent text-theme-0 backdrop-blur-3xl overflow-y-scroll`} >

        <div className="h-full absolute inset-0 bg-translucent -z-10"></div>

        {languages.length < 1 && <span className="text-center" >No hay traducciones</span>}

        {languages.map((lang: TLanguages, index: number) =>
          <li key={index} className={`hover:bg-theme-3 ${select(lang)} px-2 ${togger ? 'opacity-1' : 'opacity-0'}`}
            onClick={() => { setTogger(false); on_change_language(lang); }} >{lang.key}</li>
        )}

      </ul>
    </div>
  )
}