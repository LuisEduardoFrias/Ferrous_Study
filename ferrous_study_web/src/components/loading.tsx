import { LoadingIcon } from '../assets/svgs'
import '../styles/search.css'

export default function Loading(props) {
  return (
    <div className="progress w-full h-full flex justify-center items-center">
      <LoadingIcon {...props} />
    </div>
  )
}