import TextEditor from '../components/text_editor'
import { githubService } from '../services/github_service'
import { useTitle } from '../hooks/use_title'
import { useDialog } from '../hooks/use_dialog';
import Notify from '../components/notify';

export default function NewMarkdown() {
  useTitle('Crear nueva clase')
  const { dialogRef, open, close } = useDialog();

  async function handlerSave(textValue: string) {
    console.log("consumiendo la api update: ", await githubService.createMarkdownFile(editClassroomId, textValue))
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
      fileName={"Nueva clase"}
          className="block mx-auto p-2 text-black w-full font-sans text-base leading-relaxed border border-theme-4 focus:outline-none focus:border-theme-3"
          style={{ height: 'calc(27.94cm - 2rem)', resize: 'none' }}
        />
    </div>)
}
