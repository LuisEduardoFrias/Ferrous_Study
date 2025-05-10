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
    <div className="">
      {showTooltip && <div className="p-2 absolute rounded right-0 bottom-14 bg-translucent font-extrabold" ><p>Copiado</p></div>}
      <button
        className="rounded-md flex justify-center items-center w-14 h-14 shadow shadow-sm"
        onClick={handleCopyClick}
      >
        <CopyIcon />
      </button>
    </div>
  );
};
