import { useState, useEffect, useCallback } from 'react'
import ferrous from '../assets/ferrous.gif'
import type { TLanguages } from '../types/language'
import type { TMarkdownResult } from '../types/markdown_result'
import { FerrisIcon } from '../assets/svgs'
import MarkdownRenderer from "../components/markdown_renderer"
import { useTitle } from '../hooks/use_title'
import { githubServiceApi } from '../services/github_service'
import { useMemoryCache } from '../hooks/use_memory_cache'
import { useStore } from '../state_warehouse/index'
import { getValue } from '../hooks/local_storage'
import { Includes } from '../hooks/includes'

// import markdownHomePage from '../markdowns/home_page.md?raw'

export default function Home() {
   useTitle('')
   const { get } = useMemoryCache();
   const on_setClassId = useStore((state) => state.on_setClassId)
   const on_add_languages = useStore((state) => state.on_add_languages);
   const languageSelected = useStore((state) => state.languageSelected);
   const [content, setContent] = useState<string>('');
   const [welcome, setWelcome] = useState<string | null>(null);

   const verifyLanguageSelected = useCallback((languages: TLanguages[], textByLanguage: { language: string, text: string }[], welcome: object | null): string => {

      let languageSelected_ = languageSelected;

      if (languageSelected_) {
         if (!Includes<TLanguages>(languages, languageSelected_)) {
            //TODO se puede validad en que refion esta, si el idioma de la region se se encuentra, para colocarlo.
            languageSelected_ = languages[0];
         }

         if (welcome) {
            //@ts-ignore
            setWelcome(welcome[languageSelected_?.value])
         }

         const value = textByLanguage?.find((obj: any) => obj.language === languageSelected_?.value)

         return value?.text ?? "";
      }

      languageSelected_ = getValue<TLanguages>('language_selected');

      if (!languageSelected_ || !(Includes<TLanguages>(languages, languageSelected_))) {
         //TODO se puede validad en que refion esta, si el idioma de la region se se encuentra, para colocarlo.
         languageSelected_ = languages[0];
      }

      if (welcome) {
         //@ts-ignore
         setWelcome(welcome[languageSelected_?.value])
      }

      const value = textByLanguage?.find((obj: any) => obj.language === languageSelected_.value)

      return value?.text ?? "";
   }, [languageSelected])

   useEffect(() => {
      on_setClassId("home_page");

      (async () => {
         const result = await get<TMarkdownResult | null>("home_page", async () => {
            return await githubServiceApi.getFileContentByMarkdown("home_page");
         });

         if (!result) {
            // alert("Error en el servidor, por favor intente mas tarde.");
            return;
         }

         const languages = result.metadata.languages;

         if (languages) {
            on_add_languages(languages as TLanguages[]);
         }

         //@ts-ignore
         const text = verifyLanguageSelected(languages, result?.textByLanguage, result.metadata.data?.welcome);

         setContent(text ?? result?.content ?? '');
      })()
   }, [languageSelected, get, on_add_languages, on_setClassId]);

   return (
      <div className="h-full">
         <img src={ferrous} loading="eager" className="bg-[#ffffff] w-full" alt="ferrous gif" />
         <h1 className="flex gap-1 mt-2 font-bold -md:text-[25px] sm:text-3xl justify-center items-center">
            {welcome ?? 'Bienvenido a'} Ferrous Study! <FerrisIcon className="bg-theme-4-d rounded-full" />
         </h1>
         <br />
      <div className="p-2">
         <MarkdownRenderer>
            {content ?? ''}
         </MarkdownRenderer>
      </div>
      </div>
   )
}