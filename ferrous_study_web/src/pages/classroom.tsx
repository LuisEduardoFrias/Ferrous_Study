import { useState, useEffect, useMemo } from 'react'
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
   const languageSelected = useStore((state) => state.languageSelected);
   const on_setClassId = useStore((state) => state.on_setClassId);
   const on_add_languages = useStore((state) => state.on_add_languages);

   const [loading, setLoading] = useState<Boolean>(true);
   const [content, setContent] = useState<string>('');

   const classInfo = useMemo(() => {
      const data = dataClass.find((obj: TClass) => obj.name === classroomId);
      if (!data) return null;

      return {
         addData: data.addInfo.addData,
         updateData: data.updateInfo?.updateData,
      };
   }, [dataClass, classroomId]);

   const verifyLanguageSelected = useMemo((languages: TLanguages[], textByLanguage: TTextByLanguage[]): string | null => {

      let languageSelected_ = languageSelected;

      if (languageSelected_) {
         if (!languages.includes(languageSelected_)) {
            //TODO se puede validad en que refion esta, si el idioma de la region se se encuentra, para colocarlo.
            languageSelected_ = languages[0];
         }

         const value = textByLanguage?.find((obj: TTextByLanguage) => obj.language === languageSelected_?.value)

         return value?.text || null;
      }

      languageSelected_ = getValue<TLanguages>('language_selected');

      if (!languageSelected_ || !languages.includes(languageSelected_)) {
         //TODO se puede validad en que refion esta, si el idioma de la region se se encuentra, para colocarlo.
         languageSelected_ = languages[0];
      }

      const value = textByLanguage?.find((obj: any) => obj.language === languageSelected_.value)

      return value?.text || null;
   }, [languageSelected])

   useEffect(() => {

      (async () => {
         //setLoading(false);
         try {
            const result = await get<TMarkdownResult | null>(classroomId, async () => {
               return await githubServiceApi.getFileContentByMarkdown(classroomId);
            });

            if (!result) {
               //alert('Error en el servidor, por favor intente mas tarde.');
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

   }, [classroomId]);



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
         {classInfo && <DataInfo info={classInfo} />}
         <ButtonChangePage classroomId={classroomId} />
      </div>
   );
}

type DataInfoProps = {
   info: {
      addData: string,
      updateData: string,
   }
}

function DataInfo({ info }: DataInfoProps) {
   const STYLE_SPAN = "text-sm w-40 overflow-hidden";
   const { addData, updateData } = info;

   return (
      <div className="flex flex-row justify-between text-gray-400 border-t border-gray-200 mt-14 py-4">
         <span className={STYLE_SPAN}>Creado: {addData}</span>
         {updateData && (<span className={STYLE_SPAN}>Actualizado: {updateData}</span>)}
      </div>
   )
}
  //   (async () => {
  //     const DynamicComponent = await import(`@/${classroomId}.md?raw`);
  //     setContent(DynamicComponent.default);
  //   })();