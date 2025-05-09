import { useState } from 'react'
import { CopyIcon } from '../assets/svgs'

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setShowTooltip(true);

      setTimeout(() => {
        setShowTooltip(false)
      }, 1000)

    } catch (err) {
      console.error('Error al copiar al portapapeles: ', err);
    }
  };

  return (
    <div className="absolute right-4 top-4">
      {showTooltip && <div className="p-2 absolute rounded right-0 bottom-14 bg-translucent text-white font-extrabold" ><p>Copiado</p></div>}
      <button
        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
        onClick={handleCopyClick}
      >
        <CopyIcon />
      </button>
    </div>
  );
};
