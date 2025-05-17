import { LoadingIcon } from '../assets/svgs'
import '../styles/search.css'

type LoadingProps = {
  className?: string,
  classText?: string,
  fill?: string
}

export default function Loading(props: LoadingProps) {
  const classText = props?.classText ?? '';
  const newProps = { ...props };

  if (newProps?.classText) {
    delete newProps.classText;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className={`flex flex-row ${classText}`} >Cargando
        <div className="progress flex justify-center items-center">
          <LoadingIcon {...newProps} /> {/* Pasa la copia modificada a LoadingIcon */}
        </div>
      </span>
    </div>
  )
}
