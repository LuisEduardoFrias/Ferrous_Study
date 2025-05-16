import { useState, useEffect } from 'react'
import { githubService } from '../services/github_service'
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
    (async () => {
      const result = await get<string | null>(classroomId, async () => {
        return await githubService.getFileContent(classroomId, 'markdown');
      });

      //TODO evaluar posibke vslor null
      setContent(result ?? '');
    })()
  }, [classroomId])

  return (
    <div className="p-2">
      {!content &&
        <div className="bg-[rgba(96,96,96,0.441)] z-30 backdrop-blur-sm w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-44">
            <Loading classText="text-theme-3 font-extrabold" />
          </div>
        </div>
      }
      <MarkdownRenderer>
        {content ?? ''}
      </MarkdownRenderer>
      {classInfo &&
        <div className="flex flex-row justify-between text-gray-400 border-t border-gray-200 mt-14 py-4 " >
          <span className={STYLE_SPAN}>Creado: {classInfo.addData}</span>
          {classInfo.updateData &&
            <span className={STYLE_SPAN}>Actualizado: {classInfo.updateData}</span>
          }
          <span className={`${STYLE_SPAN} text-end`}>Autor: {classInfo.autor}</span>
        </div>
      }
      <ButtonChangePage key="buttonPage" classroomId={classroomId} />
    </div>
  );
}

  //   (async () => {
  //     const DynamicComponent = await import(`@/${classroomId}.md?raw`);
  //     setContent(DynamicComponent.default);
  //   })();