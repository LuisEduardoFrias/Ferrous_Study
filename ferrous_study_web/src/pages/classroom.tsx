import { useState, useEffect } from 'react'
import { githubServiceApi } from '../services/github_service'
import MarkdownRenderer from '../components/markdown_renderer'
import ButtonChangePage from '../components/button_change_page'
import Loading from '../components/loading'
import { useTitle } from '../hooks/use_title'
import { useMemoryCache } from '../hooks/use_memory_cache'
import { useStore } from '../state_warehouse/index'

export default function ClassRoom({ classroomId }: { classroomId: string }) {
  useTitle(classroomId)
  const { get } = useMemoryCache();
  const dataClass = useStore((state) => state.dataClass)
  const on_setClassId = useStore((state) => state.on_setClassId)
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState({ selected: 'Español', langs: [] });
  const [content, setContent] = useState<string>('');
  const STYLE_SPAN = "text-sm w-40 overflow-hidden";

  const classInfo = getData(classroomId);

  function getData(key: string) {
    const data = dataClass.find((obj) => obj.name === key);

    if (!data) return;

    return {
      addData: data.addInfo.addData,
      updateData: data!.updateInfo?.updateData,
      autor: data.addInfo.user.name,
    }
  }

  useEffect(() => {
    on_setClassId(classroomId);
    setLoading(true);

    (async () => {
      try {
        const result = await get<string | null>(classroomId, async () => {
          return await githubServiceApi.getFileContentByMarkdown(classroomId);
        });
        setLanguage({ selected: result.metadatalanguages[0].key, langs: result.metadatalanguages })
        //TODO evaluar posibke valor null

        const text = result?.textByLanguage?.find((obj) => obj.language === "en-EN").text;

        setContent(text ?? result.content ?? '');
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('developer: ', error)
      }
      finally {
        setLoading(false)
      }
    })()
  }, [classroomId])

  return (
    <div className="p-2">
      {loading &&
        <div className="bg-[rgba(96,96,96,0.441)] z-30 pt-20 backdrop-blur-sm w-full h-full absolute top-0 left-0">
          <div className="w-full h-44">
            <Loading />
          </div>
        </div>
      }
      <div>
        <SelectdLanguage language={language} />
        <MarkdownRenderer>
          {content ?? ''}
        </MarkdownRenderer>
      </div>
      {
        classInfo &&
        <div className="flex flex-row justify-between text-gray-400 border-t border-gray-200 mt-14 py-4 " >
          <span className={STYLE_SPAN}>Creado: {classInfo.addData}</span>
          {classInfo.updateData &&
            <span className={STYLE_SPAN}>Actualizado: {classInfo.updateData}</span>
          }
          <span className={`${STYLE_SPAN} text-end`}>Autor: {classInfo.autor}</span>
        </div>
      }
      <ButtonChangePage key="buttonPage" classroomId={classroomId} />
    </div >
  );
}

function SelectdLanguage({ language }) {
  const [togger, setTogger] = useState(false);
  console.log(language)
  return (
    <button onClick={() => setTogger(true)}>
      {language.selected}
      <div>
        {language.langs?.map((lang) =>
          <button>
            {lang}
          </button>
        )}
      </div>
    </button>
  )
}
  //   (async () => {
  //     const DynamicComponent = await import(`@/${classroomId}.md?raw`);
  //     setContent(DynamicComponent.default);
  //   })();