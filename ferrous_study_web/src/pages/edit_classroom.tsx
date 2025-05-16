import { useState, useEffect } from 'react'
import TextEditor from '../components/text_editor'
import { githubService } from '../services/github_service'
import { toCamelCase } from '../hooks/to_camel_case'
import { useTitle } from '../hooks/use_title'
import { useDialog } from '../hooks/use_dialog'
import Loading from '../components/loading'
import Notify from '../components/notify'
import { useMemoryCache } from '../hooks/use_memory_cache'

export default function EditClassroom({ editClassroomId }: { editClassroomId: string }) {
  useTitle(editClassroomId)
  const { get, clear } = useMemoryCache();
  const [content, setContent] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [contentErrorMessage, setContentErrorMessage] = useState<string>('');
  const [showLoading, setShowLoading] = useState(false);
  const { dialogRef, open, close } = useDialog();
  const { dialogRef: notifyContentRef, open: openContentNotify, close: closeContentNotify } = useDialog();

  useEffect(() => {
    (async () => {
      const result = await get<string | null>(editClassroomId, async () => {
        return await githubService.getFileContent(editClassroomId, 'markdown');
      });
                  
      //TODO evaluar posibke vslor null
      setContent(result ?? '');
    })()
  }, [editClassroomId])

  async function handlerSave() {
    setShowLoading(true)
    close();
    const result = await githubService.updateFileContent(editClassroomId, textValue, 'markdown');

    setContentErrorMessage(result?.message);
    clear(editClassroomId)
    setShowLoading(false)
    openContentNotify();
  }

  return (
    <div className="relative">
      <Notify ref={dialogRef} okey={handlerSave} cancel={close}>
        <span className="block text-xl font-semibold text-gray-800 mb-8 dark:text-gray-200 mb-2">
          ¡Se guardaran los datos!
        </span >
      </Notify>
      <Notify
        ref={notifyContentRef}
        okey={closeContentNotify}
      >
        <span className="block text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
          ¡Atención!
        </span>
        <span className="block text-base text-gray-700 dark:text-gray-300">
          {contentErrorMessage}
        </span>
      </Notify>
      {showLoading &&
        <div className="bg-[rgba(96,96,96,0.441)] z-50 backdrop-blur-sm w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-44">
            <Loading classText="text-theme-4 font-extrabold" />
          </div>
        </div>
      }
      <TextEditor
        onSave={(value: string) => {
          setTextValue(value);
          open();
        }}
        fileName={`Editando archivo ${toCamelCase(editClassroomId)}`}
        className="block mx-auto p-2 text-black w-full font-sans text-base leading-relaxed border border-theme-4 focus:outline-none focus:border-theme-3"
        style={{ height: 'calc(27.94cm - 2rem)', resize: 'none' }}
        defaultValue={content}
      />
    </div>
  );
}