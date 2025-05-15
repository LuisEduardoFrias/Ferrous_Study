import { useState, useEffect } from 'react'
import TextEditor from '../components/text_editor'
import { githubService } from '../services/github_service'
import { toCamelCase } from '../hooks/to_camel_case';
import { useTitle } from '../hooks/use_title'
import { useDialog } from '../hooks/use_dialog';
import Notify from '../components/notify';
import { memoryCache } from '../helps/memory_cache'

export default function EditClassroom({ editClassroomId }: { editClassroomId: string }) {
  useTitle(editClassroomId)
  const [content, setContent] = useState('');
  const { dialogRef, open, close } = useDialog();

  useEffect(() => {
    (async () => {
      const result = await memoryCache.get(editClassroomId, async () => {
        return await githubService.getFileContent(editClassroomId, 'markdown');;
      });

      setContent(result);
    })()
  }, [editClassroomId])

  async function handlerSave(textValue: string) {
    console.log("consumiendo la api update: ", await githubService.updateFileContent(editClassroomId, textValue, 'markdown'))
    close();
  }

  return (
    <div>
      <Notify ref={dialogRef} okey={handlerSave} cancel={close}>
        <span className="text-3xl mb-3">Verificacion para guardar!</span>
      </Notify>
      <TextEditor
        name="idClassRoom"
        onSave={open}
        fileName={`Editando archivo ${toCamelCase(editClassroomId)}`}
        className="block mx-auto p-2 text-black w-full font-sans text-base leading-relaxed border border-theme-4 focus:outline-none focus:border-theme-3"
        style={{ height: 'calc(27.94cm - 2rem)', resize: 'none' }}
        defaultValue={content}
      />
    </div>
  );
}