import { LoadingIcon } from '../assets/svgs'
import '../styles/search.css'

export default function Loading(props) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className={`flex flex-row ${props.classText}`} >Cargando
        <div className="progress flex justify-center items-center">
          <LoadingIcon {...props} />
        </div>
      </span>
    </div>
  )
}