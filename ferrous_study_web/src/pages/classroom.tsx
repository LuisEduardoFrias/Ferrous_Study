import { useState, useEffect } from 'react'
import { githubService } from '../services/github_service'
import MarkdownRenderer from '../components/markdown_renderer'
import ButtonChangePage from '../components/button_change_page'
import { useTitle } from '../hooks/use_title'
import { State, Actions } from '../state_warehouse'
import { useSubscriberState, useActions } from 'subscriber_state'
import { useMemoryCache } from '../hooks/use_memory_cache'

export default function ClassRoom({ classroomId }: { classroomId: string }) {
  useTitle(classroomId)
  const [get] = useMemoryCache();
  const [{ dataClass }] = useSubscriberState<State, Actions>(['dataClass'])
  const [content, setContent] = useState('');
  const STYLE_SPAN = "text-sm w-40 overflow-hidden";

  const classInfo = getData(classroomId);

  function getData(key: string) {
    const data = dataClass.find((obj) => obj.name === key);

    if (!data) return;

    return {
      addData: data.addInfo.addData,
      updateData: data.updateInfo.updateData,
      autor: data.addInfo.user.name,
    }
  }

  useEffect(() => {
    (async () => {
      const result = await get(classroomId, async () => {
        return await githubService.getFileContent(classroomId, 'markdown');
      });

      setContent(result);
    })()
  }, [classroomId])

  return (
    <div name="classRoom" className="p-2">
      <MarkdownRenderer>
        {content}
      </MarkdownRenderer>
      {classInfo &&
        <div className="flex flex-row justify-between text-gray-400 border-t border-gray-200 mt-14 py-4 " >
          <span className={STYLE_SPAN}>Creado: {classInfo.addData}</span>
          <span className={STYLE_SPAN}>Actualizado: {classInfo.updateData}</span>
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