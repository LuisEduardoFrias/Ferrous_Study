import { useState, ChangeEvent } from 'react'
import TextEditor from '../components/text_editor'
import { githubServiceApi } from '../services/github_service'
import { useTitle } from '../hooks/use_title'
import { useDialog } from '../hooks/use_dialog';
import { SuccessIcon, ErrorIcon } from '../assets/svgs'
import Loading from '../components/loading'
import Notify from '../components/notify';
import { useStore } from '../state_warehouse/index'
import type { TServiceResult } from '../types/service_result'

export default function NewMarkdown() {
  useTitle('Crear nueva clase')
  const initial_state = useStore((state) => state.initial_state)
  const { dialogRef: verifyRef, open: openV, close: closeV } = useDialog();
  const { dialogRef, open, close } = useDialog();
  const { dialogRef: keywordsRef, open: keywordsOpen, close: keywordsClose } = useDialog();
  const { dialogRef: notifyContentRef, open: openContentNotify, close: closeContentNotify } = useDialog();
  const [newClassId, setNewClassId] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [showLoading, setShowLoading] = useState(false);
  const [contentErrorMessage, setContentErrorMessage] = useState<TServiceResult>({ message: '' });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.toLowerCase();
    if (value.startsWith(' ')) return;
    if (/^[0-9]/.test(value)) return;
    const newValue = value.replace(/\s+/g, '_');
    setNewClassId(newValue);
  };

  //////////  KEY-WORDS
  const handleInputChangeKeywords = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    value = value.toLowerCase();
    if (value.startsWith(' ')) return;
    if (/^[0-9]/.test(value)) return;
    const newValue = value.replace(/\s+/g, ',');
    setKeywords(newValue);
  };

  async function handlerSave() {
    closeV();

    if (!textValue || textValue.trim().length === 0) {
      setContentErrorMessage({ message: 'La clase debe tener contenido para poder ser guardada.' });
      openContentNotify();
      return;
    }

    if (textValue.length < 100) {
      setContentErrorMessage({ message: 'El contenido de la clase es muy pequeño. El mínimo de caracteres es 100.' });
      openContentNotify();
      return;
    }

    setShowLoading(true);
    const result = await githubServiceApi.createMarkdownFile(newClassId as string, textValue, keywords.split(','));

    setContentErrorMessage({ ...result });
    setShowLoading(false);

    if (result?.data) {
      initial_state();
      setNewClassId('');
      setTextValue('');
      setKeywords('');
    }
    openContentNotify();
    return;
  }

  return (
    <div className="relative">
      <Notify
        ref={verifyRef}
        okey={handlerSave}
        cancel={closeV}
      >
        <span className="block text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          ¿Estás seguro de guardar esta clase ?
        </span >
        <span className="block text-base text-gray-600 dark:text-gray-400">
          Una vez guardado, debes configurar las opciones en el menú y dirigirte a ella para poder editarla.
        </span>
      </Notify >

      <Notify
        ref={dialogRef}
        okey={() => {
          if (newClassId) {
            keywordsOpen();
            close();
          }
        }}
        cancel={close}
      >
        <input
          type="text"
          className="bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="ID de la nueva clase"
          value={newClassId}
          onChange={handleInputChange}
        />
      </Notify>

      <Notify
        ref={keywordsRef}
        okey={() => {
          if (keywords) {
            openV();
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

      <Notify
        ref={notifyContentRef}
        okey={closeContentNotify}
      >
        {contentErrorMessage?.data ?
          <SuccessIcon /> :
          <ErrorIcon />
        }
        <span className={`block text-xl font-semibold ${contentErrorMessage?.data ? "text-green-500" : "text-red-500"} mb-2`}>
          ¡Atención!
        </span>
        <span className="block text-base text-gray-700 dark:text-gray-300">
          {contentErrorMessage.message}
        </span>
      </Notify>

      {showLoading &&
        <div className="bg-[rgba(96,96,96,0.441)] z-50 backdrop-blur-sm w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-44">
            <Loading />
          </div>
        </div>
      }

      <TextEditor
        onSave={(value: string) => {
          setTextValue(value);
          open();
        }}
        defaultValue={textValue}
        fileName={newClassId === '' ? "Nueva clase" : newClassId}
        className="block mx-auto p-2 text-black w-full font-sans text-base leading-relaxed border border-theme-4 focus:outline-none focus:border-theme-3"
        style={{ height: 'calc(27.94cm - 2rem)', resize: 'none' }}
      />
    </div >
  );
}
