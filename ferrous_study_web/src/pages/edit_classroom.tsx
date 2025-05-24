import { useState, useEffect, useRef, ChangeEvent } from 'react'
import TextEditor from '../components/text_editor'
import { githubService } from '../services/github_service'
import { toCamelCase } from '../hooks/to_camel_case'
import { useTitle } from '../hooks/use_title'
import { useDialog } from '../hooks/use_dialog'
import { SuccessIcon, ErrorIcon } from '../assets/svgs'
import Loading from '../components/loading'
import Notify from '../components/notify'
import { useMemoryCache } from '../hooks/use_memory_cache'
import type { TClass } from '../types/class'
import type { TServiceResult } from '../types/service_result'

export default function EditClassroom({ editClassroomId }: { editClassroomId: string }) {
  useTitle(editClassroomId)
  const { get, clear } = useMemoryCache();
  const [content, setContent] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [contentErrorMessage, setContentErrorMessage] = useState<TServiceResult>({ message: '' });
  const [showLoading, setShowLoading] = useState(false);
  const { dialogRef, open, close } = useDialog();
  const { dialogRef: keywordsRef, open: keywordsOpen, close: keywordsClose } = useDialog();
  const { dialogRef: notifyContentRef, open: openContentNotify, close: closeContentNotify } = useDialog();
  const classRef = useRef<TClass[]>([]);

  useEffect(() => {
    (async () => {
      setShowLoading(true);

      const result = await get<string | null>(editClassroomId, async () => {
        return await githubService.getFileContentByMarkdown(editClassroomId);
      });
      const resultClass = await get<string | null>("class", async () => {
        return await githubService.getFileContentByJson('class');
      });

      if (resultClass) {
        const deseClass = JSON.parse(resultClass);
        const findClsss = deseClass.find((obj: TClass) => obj.name === editClassroomId);
        classRef.current = deseClass;

        if (findClsss) {
          setKeywords(findClsss.keywords.join(','))
        }
      }

      //TODO evaluar posible valor null
      setContent(result?.textByLanguage?.find((obj) => obj.language === "en-En") ?? result.content ?? '');
      setShowLoading(false);
    })()
  }, [editClassroomId])

  const handleInputChangeKeywords = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.toLowerCase();
    if (value.startsWith(' ')) return;
    if (/^[0-9]/.test(value)) return;
    const newValue = value.replace(/\s+/g, ',');
    setKeywords(newValue);
  };

  async function handlerSave() {
    setShowLoading(true)
    close();
    const updateClass = classRef.current.map((obj: TClass) => {
      if (obj.name === editClassroomId) {
        obj.keywords = keywords.split(',');
      }
      return obj;
    });

    const [result] = await Promise.all([
      await githubService.updateFileContent(editClassroomId, textValue, 'markdown'),
      await githubService.updateFileContent('class', JSON.stringify(updateClass), 'json')
    ]);

    setContentErrorMessage({ ...result });
    clear(editClassroomId)
    setShowLoading(false)
    openContentNotify();
  }

  return (
    <div className="relative">

      <Notify ref={dialogRef} okey={handlerSave} cancel={close}>
        <span className="block text-xl flex gap-4 font-semibold text-gray-800 mb-8 dark:text-gray-200 mb-2">
          <ErrorIcon fill="#006fff" /> ¡Se guardara la información!
        </span >
      </Notify>

      <Notify
        ref={notifyContentRef}
        okey={closeContentNotify}
      >
        <div className="flex flex-row gap-4 mb-2">
          {contentErrorMessage?.data ?
            <SuccessIcon /> :
            <ErrorIcon />
          }
          <span className={`block text-xl font-semibold ${contentErrorMessage?.data ? "text-green-500" : "text-red-500"} mb-2`}>
            ¡Atención!
          </span>
        </div>
        <span className="block text-base text-gray-700 dark:text-gray-300">
          {contentErrorMessage.message}
        </span>
      </Notify>

      <Notify
        ref={keywordsRef}
        okey={() => {
          if (keywords) {
            open();
            keywordsClose();
          }
        }}
        cancel={keywordsClose}
      >
        <input
          type="text"
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="rust,curso,aprender,programación"
          value={keywords}
          onChange={handleInputChangeKeywords}
        />
        <span className="block text-base text-gray-600 dark:text-gray-400">
          Agrega palabras clave que ayuden a encontrar esta clase en el buscador. Puedes separarlas con comas (,) o espacios.
        </span>
      </Notify>

      {showLoading &&
        <div className="bg-[rgba(96,96,96,0.441)] z-50 pt-20 backdrop-blur-sm w-full h-full absolute top-0 left-0">
          <div className="w-full h-44">
            <Loading />
          </div>
        </div>
      }

      <TextEditor
        onSave={(value: string) => {
          setTextValue(value);
          keywordsOpen();
        }}
        fileName={`Editando archivo ${toCamelCase(editClassroomId)}`}
        className="block mx-auto p-2 text-black w-full font-sans text-base leading-relaxed border border-theme-4 focus:outline-none focus:border-theme-3"
        style={{ height: 'calc(27.94cm - 2rem)', resize: 'none' }}
        defaultValue={content}
      />

    </div>
  );
}