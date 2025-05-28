import { useState, useEffect, useCallback, useMemo } from 'react'
import { githubServiceApi } from '../services/github_service'
import MarkdownRenderer from '../components/markdown_renderer'
import ButtonChangePage from '../components/button_change_page'
import Loading from '../components/loading'
import { useTitle } from '../hooks/use_title'
import { useMemoryCache } from '../hooks/use_memory_cache'
import { useStore } from '../state_warehouse/index'
import { getValue } from '../hooks/local_storage'

import type { TClass } from '../types/class'
import type { TLanguages } from '../types/language'
import type { TMarkdownResult, TTextByLanguage } from '../types/markdown_result'


export default function ClassRoom({ classroomId }: { classroomId: string }) {
   useTitle(classroomId);
   const { get } = useMemoryCache();

   const dataClass = useStore((state) => state.dataClass);
   const on_setClassId = useStore((state) => state.on_setClassId);
   const on_add_languages = useStore((state) => state.on_add_languages);
   const languageSelected = useStore((state) => state.languageSelected);

   const [loading, setLoading] = useState(true);
   const [content, setContent] = useState<string>('');

   const classInfo = useMemo(() => {
      const data = dataClass.find((obj: TClass) => obj.name === classroomId);
      if (!data) return null;

      return {
         addData: data.addInfo.addData,
         updateData: data.updateInfo?.updateData,
         autor: data.addInfo.user.name,
      };
   }, [dataClass, classroomId]);

   const verifyLanguageSelected = useCallback((languages: TLanguages[], textByLanguage: TTextByLanguage[]): string | null => {

      let languageSelected_ = languageSelected;

      if (languageSelected_) {
         if (!languages.includes(languageSelected_)) {
            //TODO se puede validad en que refion esta, si el idioma de la region se se encuentra, para colocarlo.
            languageSelected_ = languages[0];
         }

         const value = textByLanguage?.find((obj: TTextByLanguage) => obj.language === languageSelected_?.value)

         return value?.text|| null;
      }

      languageSelected_ = getValue<TLanguages>('language_selected');

      if (!languageSelected_ || !languages.includes(languageSelected_)) {
         //TODO se puede validad en que refion esta, si el idioma de la region se se encuentra, para colocarlo.
         languageSelected_ = languages[0];
      }

      const value = textByLanguage?.find((obj: any) => obj.language === languageSelected_.value)

      return value?.text|| null;
   }, [languageSelected])

   useEffect(() => {

      (async () => {
         try {
            const result = await get<TMarkdownResult | null>(classroomId, async () => {
               return await githubServiceApi.getFileContentByMarkdown(classroomId);
            });

            if (!result) {
               alert('Error ennel servidor, por favor intente mas tarde.');
               setLoading(false);
               return;
            }

            const languages = result.metadata.languages;

            if (languages) {
               on_add_languages(languages as TLanguages[]);
            }

            const text = verifyLanguageSelected(languages, result?.textByLanguage);

            setContent(text ?? result?.content ?? '');
         } catch (error) {
            console.error('Failed to fetch class content:', error);
         } finally {
            on_setClassId(classroomId);
            setLoading(false);
         }
      })()

   }, [classroomId, languageSelected, get, on_add_languages, on_setClassId]);

   const STYLE_SPAN = "text-sm w-40 overflow-hidden";

   return (
      <div className="p-2">
         {loading && (
            <div className="bg-[rgba(96,96,96,0.441)] z-30 pt-20 backdrop-blur-sm w-full h-full absolute top-0 left-0">
               <div className="w-full h-44">
                  <Loading />
               </div>
            </div>
         )}
         <div>
            <MarkdownRenderer>
               {content}
            </MarkdownRenderer>
         </div>
         {classInfo && (
            <div className="flex flex-row justify-between text-gray-400 border-t border-gray-200 mt-14 py-4">
               <span className={STYLE_SPAN}>Creado: {classInfo.addData}</span>
               {classInfo.updateData && (
                  <span className={STYLE_SPAN}>Actualizado: {classInfo.updateData}</span>
               )}
               {// <span className={`${STYLE_SPAN} text-end`}>Autor: {classInfo.autor}</span> 
               }
            </div>
         )}
         <ButtonChangePage classroomId={classroomId} />
      </div>
   );
}


  //   (async () => {
  //     const DynamicComponent = await import(`@/${classroomId}.md?raw`);
  //     setContent(DynamicComponent.default);
  //   })();