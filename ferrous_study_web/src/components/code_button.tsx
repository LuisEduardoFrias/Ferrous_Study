import { CodeIcon } from '../assets/svgs'

interface CopyButtonProps {
  textToCode: string;
}

export default function CopyButton({ textToCode }: CopyButtonProps) {

  //TODO: variabke de entorno
  const url = `Https://play.rust-lang.org/?version=stable&mode=debug&edition=2024&code=${encodeURIComponent(textToCode)}`

  return (
    <div>
      <a target="_blank" rel="noopener noreferrer" href={url} className="rounded-md bg-theme-4 flex justify-center items-center w-14 h-14 shadow shadow-sm" >
        <CodeIcon />
      </a>
    </div>
  );
};
