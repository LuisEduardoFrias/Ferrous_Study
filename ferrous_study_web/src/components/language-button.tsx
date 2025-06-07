import { useState, useCallback } from 'react'
import { useClickOutside } from '../hooks/use_click_on_side'
import { WorldIcon } from '../assets/svgs'
import { useStore } from '../state_warehouse/index'
//import { getValue } from '../hooks/local_storage'
import type { TLanguages } from '../types/language'

export default function LanguageButton() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const ulRef = useClickOutside<HTMLDivElement>(() => setIsMenuOpen(false));
   const languages = useStore((state) => state.languages);
   const languageSelected = useStore((state) => state.languageSelected);
   const on_change_language = useStore((state) => state.on_change_language);

   const isLanguageSelected = useCallback((lang: TLanguages): string => {
      let languageSelected_ = languageSelected;

      if (!languageSelected_) {
         //TODO se puede validad en que refion esta, si el idioma de la region se se encuentra, para colocarlo.
         languageSelected_ = languages[0];
      }

      return languageSelected_.value === lang.value
         ? 'bg-theme-d-4 font-bold border-t border-b border-theme-3'
         : '';
   }, [languageSelected, languages]);

   const handleLanguageClick = useCallback((lang: TLanguages) => {
      setIsMenuOpen(false);
      on_change_language(lang);
   }, [on_change_language]);

   return (
      <div ref={ulRef} className="relative">
         <WorldIcon onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer" />

         <ul
            className={`
          absolute top-12 right-0 transition-all shadow shadow-theme-4 w-32
          ${isMenuOpen ? 'h-auto py-2' : 'py-0 h-0'}
          flex flex-col gap-2 bg-translucent text-white backdrop-blur-xl
          overflow-hidden z-50 rounded-sm
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
         >

            <div className="h-full absolute inset-0 bg-translucent -z-10"></div>

            {languages.length === 0 && (
               <span className="text-center p-2 text-sm text-theme-00">No hay traducciones disponibles.</span>
            )}

            {languages.map((lang: TLanguages) => (
               <li
                  key={lang.value}
                  className={`
              hover:bg-theme-3 cursor-pointer
              ${isLanguageSelected(lang)}
              px-2 py-1 text-sm
            `}
                  onClick={() => handleLanguageClick(lang)}
               >
                  {lang.key}
               </li>
            ))}
         </ul>
      </div>
   );
}
